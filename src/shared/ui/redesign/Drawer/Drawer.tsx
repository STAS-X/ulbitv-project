/* eslint-disable import/no-extraneous-dependencies */
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import React, { FC, memo, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Overlay } from '../../redesign/Overlay/Overlay';
import classes from './Drawer.module.scss';
import { Portal } from '../../redesign/Portal/Portal';
import { useAnimationLibrarys } from '../../../lib/components/AnimationProvider';
import { AnimationProvider } from '@/shared/lib/components/AnimationProvider';
import { useTheme } from '@/shared/lib/hooks/useTheme';
//import * as Gesture from '@use-gesture/react';
//import * as Spring from '@react-spring/web';

interface DrawerProps {
	className?: string;
	children: ReactNode;
	maxHeight?: string;
	isOpen?: boolean;
	onClose?: () => void;
}

const DrawerContent = (props: DrawerProps) => {
	const { Spring, Gesture } = useAnimationLibrarys();

	// console.log(props, 'get animation provider');

	const { className, children, onClose = () => null, maxHeight = '70%', isOpen = false } = props;

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
			if (contentRef?.current && height === 0) {
				console.log(contentRef.current.offsetHeight, 'current height');
				setHeight(contentRef.current.offsetHeight);
			}
		}
	}, [contentRef, height, isOpen]);

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
				//console.log(my, 'get offset my');
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

	const rubberStyle = {
		...(isOpen
			? height > 0 && y.get() !== 0
				? y.get() < 0
					? { height: height - deltaY, overflow: 'hidden' }
					: { y, height, overflow: 'hidden' }
				: { height: maxHeight, overflow: 'auto' }
			: {})
	};

	return (
		<Portal>
			<div className={classNames(classes.Drawer, mods, [className, theme, 'app_drawer_redesign'])}>
				<Overlay onClick={onClose} />
				<Spring.a.div
					ref={contentRef}
					className={classNames(classes.content, {}, [])}
					style={rubberStyle}
					{...bind()}
				>
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

/**
 * Используем новые компоненты из папки redesigned
 */
export const Drawer: FC<DrawerProps> = memo((props: DrawerProps) => {
	return (
		<AnimationProvider>
			<DrawerLazy {...props} />
		</AnimationProvider>
	);
});
