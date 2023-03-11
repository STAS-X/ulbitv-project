import { FC, ReactNode, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Portal } from '../Portal/Portal';
import classes from './Modal.module.scss';

export interface ModalProps {
	className?: string;
	children?: ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ className, children, isOpen, onClose }) => {
	const { theme } = useTheme();

	const mods: Record<string, boolean> = {
		...(isOpen ? { [classes.opened]: true } : { [classes.nocontent]: true })
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
			<div className={classNames(classes.modal, mods, [className, `${theme}`])}>
				<div className={classes.overlay} onClick={closeHandler}>
					<div className={classNames(classes.content)} onClick={contentClick}>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	);
};
