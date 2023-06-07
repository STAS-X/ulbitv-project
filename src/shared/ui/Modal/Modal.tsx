import { FC, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Portal } from '../Portal/Portal';
import classes from './Modal.module.scss';
import { Overlay } from '../Overlay/Overlay';

export interface ModalProps {
	className?: string;
	children?: ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

export const Modal: FC<ModalProps> = (props: ModalProps) => {
	const { className, children, isOpen, onClose } = props;

	const { theme } = useTheme();

	const mods: Mods = {
		[classes.opened]: isOpen,
		[classes.closed]: !isOpen
	};

	return (
		<Portal>
			<div className={classNames(classes.modal, mods, [className, theme, 'app_modal'])}>
				<Overlay onClick={onClose} />
				<div className={classNames(classes.content, {}, [])}>{children}</div>
			</div>
		</Portal>
	);
};
