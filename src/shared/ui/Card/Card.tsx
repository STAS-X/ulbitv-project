import { FC, HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Card.module.scss';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children?: ReactNode;
}

export const Card: FC<CardProps> = memo((props: CardProps) => {
	const { className, children, ...otherProps } = props;

	return (
		<div className={classNames(classes.card, {}, [className])} {...otherProps}>
			{children}
		</div>
	);
});
