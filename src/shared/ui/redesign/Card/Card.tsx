import { FC, HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Card.module.scss';

type CardTheme = 'normal' | 'outline';
type CardBorder = 'standart' | 'round';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children?: ReactNode;
	variant?: CardTheme;
	dataTestId?: string;
	border?:CardBorder;
	paddings?: number;
}

/**
 * Используем новые компоненты из папки redesigned
 */
export const Card: FC<CardProps> = memo((props: CardProps) => {
	const {
		className,
		variant = 'normal',
		border = 'standart',
		paddings = 10,
		children,
		dataTestId = '',
		...otherProps
	} = props;

	return (
		<div
			data-testid={dataTestId}
			className={classNames(classes.card, {}, [classes[variant], classes[border], className])}
			style={{ padding: paddings }}
			{...otherProps}
		>
			{children}
		</div>
	);
});
