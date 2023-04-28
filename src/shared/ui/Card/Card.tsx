import { FC, HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Card.module.scss';

export enum CardTheme {
	NORMAL = 'normal',
	OUTLINE = 'outline'
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children?: ReactNode;
	theme?: CardTheme;
}

export const Card: FC<CardProps> = memo((props: CardProps) => {
	const { className, theme = CardTheme.NORMAL, children, ...otherProps } = props;

	return (
		<div className={classNames(classes.card, {}, [className])} {...otherProps}>
			{children}
		</div>
	);
});
