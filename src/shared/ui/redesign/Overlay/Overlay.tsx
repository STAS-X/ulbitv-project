import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
// eslint-disable-next-line stas-eslint-plugin/layer-imports
import { useFeaturesByKey } from '@/entities/User';
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

	const isAppRedesigned = useFeaturesByKey('isAppRedesigned');

	return (
		<div
			onClick={onClick}
			className={classNames(classes.Overlay, { [classes.redesigned]: isAppRedesigned as boolean }, [className])}
		>
			{children}
		</div>
	);
});
