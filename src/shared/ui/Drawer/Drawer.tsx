/* eslint-disable import/no-extraneous-dependencies */
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, { memo, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { Overlay } from '../Overlay/Overlay';
import classes from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { useAnimationLibrarys } from '../../lib/components/AnimationProvider';
//import * as Gesture from '@use-gesture/react';
//import * as Spring from '@react-spring/web';

interface DrawerProps {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
}

export const DrawerContent = memo((props: DrawerProps) => {
	const { Spring, Gesture } = useAnimationLibrarys();

	const { className, children, onClose = () => null, isOpen = false } = props;

	const [dy, setDy] = useState(0);
	const [height, setHeight] = useState(0);
	const contentRef = useRef<HTMLDivElement>(null);

	const [{ y }, api] = Spring.useSpring(() => ({ y: 0 }));

	const { theme } = useTheme();

	const mods: Mods = {
		[classes.opened]: isOpen,
		[classes.closed]: !isOpen
	};

	const openDrawer = useCallback(() => {
		setDy(0);
		api.start({ y: 0, immediate: true });
	}, [api]);

	const close = useCallback(
		(velocity = 0) => {
			api.start({
				y: height,
				immediate: true,
				config: { ...Spring.config.stiff, velocity },
				onResolve: onClose
			});
		},
		[Spring.config.stiff, api, height, onClose]
	);

	useEffect(() => {
		if (contentRef?.current) {
			//console.log(contentRef.current.clientHeight, 'current height');
			setHeight(contentRef.current.clientHeight);
		}
	}, [contentRef]);

	const bind = Gesture.useDrag(
		({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel }) => {
			if (my < -70) {
				//console.log('open');
				cancel();
				//openDrawer();
			}
			if (my > height * 0.8) {
				//console.log('closed');
				close(vy);
				cancel();
			}

			if (last) {
				//console.log('last');
				if (my > height * 0.3 || (vy > 0.3 && dy > 0 && my > 0)) {
					//console.log(my, height * 0.3, vy, dy, 'close');
					close();
				} else {
					openDrawer();
				}
			} else {
				api.start({ y: my, immediate: true });
				setDy(my);
			}
		},
		{
			filterTaps: true,
			bounds: { top: -50 },
			rubberband: true
		}
	);

	// const display = y.to((dy) => {
	// 	return dy < height ? 'block' : 'none';
	// });

	const rubberStyle = useMemo(() => {
		return {
			//display,
			//bottom: `calc(-100vh + ${height - 100}px)`,
			...(dy !== 0 ? { height: height - dy, overflow: 'hidden' } : { height: '70%', overflow: 'auto' })
		};
	}, [dy, height]);

	useEffect(() => {
		setDy(0);
	}, [isOpen]);

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
});

export const Drawer = memo((props: DrawerProps) => {
	const { isLoaded } = useAnimationLibrarys();

	if (!isLoaded) {
		return null;
	}

	return <DrawerContent {...props} />;
});
