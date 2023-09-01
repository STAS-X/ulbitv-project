import { FC, ReactNode, useCallback, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { Portal } from '../Portal/Portal';
import classes from './Modal.module.scss';
import { Overlay } from '../Overlay/Overlay';

export interface ModalProps {
	className?: string;
	children?: ReactNode;
	isOpen: boolean;
	onClose?: () => void;
}

/**
 * Используем новые компоненты из папки redesigned
 */
export const Modal: FC<ModalProps> = (props: ModalProps) => {
	const { className, children, isOpen, onClose } = props;

	const { theme } = useTheme();

	const mods: Mods = useMemo(() => {
		return {
			[classes.opened]: isOpen,
			[classes.closed]: !isOpen,
		};
	}, [isOpen]);

	const handleClose = useCallback(() => {
		onClose?.();
	}, [onClose]);

	return (
		<Portal>
			<div className={classNames(classes.modal, mods, [className, theme, 'app_modal_redesign'])}>
				<Overlay onClick={handleClose} />
				<div className={classNames(classes.content)}>{children}</div>
			</div>
		</Portal>
	);
};
