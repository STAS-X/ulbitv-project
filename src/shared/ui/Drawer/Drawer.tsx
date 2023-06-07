/* eslint-disable import/no-extraneous-dependencies */
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import React, { memo, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Overlay } from '../Overlay/Overlay';
import classes from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { useAnimationLibrarys } from '../../lib/components/AnimationProvider';
import { AnimationProvider } from '@/shared/lib/components/AnimationProvider';
//import * as Gesture from '@use-gesture/react';
//import * as Spring from '@react-spring/web';

interface DrawerProps {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
}

const DrawerContent = (props: DrawerProps) => {
	const { Spring, Gesture } = useAnimationLibrarys();

	const { className, children, onClose = () => null, isOpen = false } = props;

	const [deltaY, setDeltaY] = useState(0);
	const [height, setHeight] = useState<number>(0);
	const contentRef = useRef<HTMLDivElement>(null);

	const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
	console.log(isOpen, 'isopen status');
	const { theme } = useTheme();

	const mods: Mods = {
		[classes.opened]: isOpen,
		[classes.closed]: !isOpen
	};

	const openDrawer = useCallback(() => {
		setDeltaY(0);
		api.start({ y: 0, immediate: true });
	}, [api]);

	const close = useCallback(
		(velocity = 0) => {
			setDeltaY(0);
			api.start({
				y: height,
				immediate: true,
				config: { ...Spring.config.stiff, velocity },
				onResolve: () => {
					console.log('closing...');
					api.start({ y: 0, immediate: false });
					onClose();
				}
			});
		},
		[Spring.config.stiff, api, height, onClose]
	);

	useEffect(() => {
		if (isOpen) {
			if (contentRef?.current) {
				console.log(contentRef.current.clientHeight, 'current height');
				setHeight(contentRef.current.clientHeight);
			}
		}
	}, [contentRef, api, isOpen]);

	const bind = Gesture.useDrag(
		({ last, velocity: [, vy], direction: [, dy], offset: [, my], cancel }) => {
			setDeltaY(my);
			if (my < -70) {
				console.log('open');
				openDrawer();
				cancel();
			}
			if (my > height * 0.8) {
				console.log('closed');
				close(vy);
				cancel();
			}

			if (last) {
				//console.log('last');
				if (my > height * 0.6 || (vy > 0.3 && dy > 0 && my > 0)) {
					//console.log(my, height * 0.3, vy, dy, 'close');
					close();
				} else {
					openDrawer();
				}
			} else {
				console.log(my, 'get offset my');
				api.start({ y: my, immediate: true });
				//setDeltaY(my);
			}
		},
		{
			filterTaps: true,
			rubberband: true,
			from: [0, 0],
			axis: 'y',
			bounds: { top: -70 }
		}
	);

	// const display = y.to((dy) => {
	// 	return dy < height ? 'block' : 'none';
	// });
	console.log(height, y, y.get(), 'get y data from spring');

	const rubberStyle = {
		...(isOpen
			? height > 0 && y.get() !== 0
				? y.get() < 0
					? { height: height - deltaY, overflow: 'hidden' }
					: { y, height, overflow: 'hidden' }
				: { height: '70%', overflow: 'auto' }
			: {})
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps

	return (
		<Portal>
			<div className={classNames(classes.Drawer, mods, [className, theme, 'app_drawer'])}>
				<Overlay onClick={onClose} />
				<Spring.a.div ref={contentRef} className={classNames(classes.content, {}, [])} style={rubberStyle} {...bind()}>
					{children}
				</Spring.a.div>
			</div>
		</Portal>
	);
};

const DrawerLazy = (props: DrawerProps) => {
	const { isLoaded } = useAnimationLibrarys();

	if (!isLoaded) {
		return null;
	}

	return <DrawerContent {...props} />;
};

export const Drawer = memo((props: DrawerProps) => {
	return (
		<AnimationProvider>
			<DrawerLazy {...props} />
		</AnimationProvider>
	);
});
