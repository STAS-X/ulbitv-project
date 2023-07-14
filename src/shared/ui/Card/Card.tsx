import { FC, HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Card.module.scss';

export enum CardTheme {
	NORMAL = 'normal',
	OUTLINE = 'outline'
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children?: ReactNode;
	theme?: CardTheme;
	dataTestId?: string;
}

export const Card: FC<CardProps> = memo((props: CardProps) => {
	const { className, theme = CardTheme.NORMAL, children, dataTestId = '', ...otherProps } = props;

	return (
		<div data-testid={dataTestId} className={classNames(classes.card, {}, [className])} {...otherProps}>
			{children}
		</div>
	);
});
