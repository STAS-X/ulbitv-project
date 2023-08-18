import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import cls from './Overlay.module.scss';

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
		<div onClick={onClick} className={classNames(cls.Overlay, {}, [className])}>
			{children}
		</div>
	);
});