import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import classes from './Overlay.module.scss';

interface OverlayProps {
	className?: string;
	onClick?: () => void;
	children?: ReactNode;
}

/**
 * Используем новые компоненты из папки redesigned
 */
export const Overlay = memo((props: OverlayProps) => {
	const { className, onClick, children } = props;

	return (
		<div
			onClick={onClick}
			className={classNames(classes.Overlay, {}, [className])}
		>
			{children}
		</div>
	);
});
