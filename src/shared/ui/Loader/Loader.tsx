import { FC, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Loader.module.scss';

export interface LoaderProps {
	className?: string;
	children?: ReactNode;
}

export const Loader: FC<LoaderProps> = ({ className }) => (
	<div className={classNames(classes['lds-grid'], {}, [className ?? ''])}>
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
	</div>
);
