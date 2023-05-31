import { FC, ReactNode, useCallback, useEffect } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
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

	const closeHandler = useCallback(() => {
		if (onClose) onClose();
	}, [onClose]);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeHandler();
				if (document.activeElement instanceof HTMLButtonElement) document.activeElement.blur();
			}
		},
		[closeHandler]
	);

	const contentClick = (e: React.MouseEvent) => e.stopPropagation();

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [onKeyDown]);

	return (
		<Portal>
			<div className={classNames(classes.modal, mods, [className, theme, 'app_modal'])}>
				<Overlay onClick={closeHandler}>
					<div className={classNames(classes.content, {}, [])} onClick={contentClick}>
						{children}
					</div>
				</Overlay>
			</div>
		</Portal>
	);
};
