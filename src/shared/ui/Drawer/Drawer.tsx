/* eslint-disable import/no-extraneous-dependencies */
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, { memo, ReactNode, useCallback, useEffect } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { Overlay } from '../Overlay/Overlay';
import classes from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import * as Gesture from '@use-gesture/react';
import * as Spring from '@react-spring/web';

interface DrawerProps {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
}

const height = window.innerHeight + 300;

export const Drawer = memo((props: DrawerProps) => {
	Gesture;
	//const { Spring, Gesture } = useAnimationLibs();
	const [{ y }, api] = Spring.useSpring(() => ({ y: height }));

	const { className, children, onClose = () => null, isOpen = false } = props;
	const { theme } = useTheme();

	const mods: Mods = {
		[classes.opened]: isOpen,
		[classes.closed]: !isOpen
	};

	const openDrawer = useCallback(() => {
		api.start({ y: 0, immediate: false });
	}, [api]);

	useEffect(() => {
		if (isOpen) {
			openDrawer();
		}
	}, [api, isOpen, openDrawer]);

	const close = (velocity = 0) => {
		api.start({
			y: height,
			immediate: false,
			config: { ...Spring.config.stiff, velocity },
			onResolve: onClose
		});
	};

	const bind = Gesture.useDrag(
		({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel }) => {
			if (my < -70) cancel();

			if (last) {
				if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
					close();
				} else {
					openDrawer();
				}
			} else {
				api.start({ y: my, immediate: true });
			}
		},
		{
			from: () => [0, y.get()],
			filterTaps: true,
			bounds: { top: 0 },
			rubberband: true
		}
	);

	if (!isOpen) {
		return null;
	}

	const display = y.to((py) => (py < height ? 'block' : 'none'));

	//const contentClick = (e: React.MouseEvent) => e.stopPropagation();

	return (
		<Portal>
			<div className={classNames(classes.Drawer, mods, [className, theme, 'app_drawer'])}>
				<Overlay onClick={onClose} />
				<Spring.a.div
					className={classes.content}
					style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
					{...bind()}
				>
					{children}
				</Spring.a.div>
			</div>
		</Portal>
	);
});

// export const Drawer = memo((props: DrawerProps) => {
// 	const { isLoaded } = useAnimationLibs();

// 	if (!isLoaded) {
// 		return null;
// 	}

// 	return <DrawerContent {...props} />;
// });
