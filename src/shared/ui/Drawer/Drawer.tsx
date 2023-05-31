import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, { memo, ReactNode } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { Overlay } from '../Overlay/Overlay';
import classes from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { useModal } from '../../lib/hooks/useModal';

interface DrawerProps {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
	const { className, children, onClose = () => null, isOpen = false } = props;
	const { theme } = useTheme();

	const { closeHandler } = useModal({ onClose, animationDelay: 1000 });

	const mods: Mods = {
		[classes.opened]: isOpen,
		[classes.closed]: !isOpen
	};
	//const contentClick = (e: React.MouseEvent) => e.stopPropagation();

	return (
		<Portal>
			<div className={classNames(classes.Drawer, mods, [className, theme, 'app_drawer'])}>
				<Overlay onClick={closeHandler} />
				<div className={classes.content}>{children}</div>
			</div>
		</Portal>
	);
});
