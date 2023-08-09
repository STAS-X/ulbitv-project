import { FC, memo, ReactNode } from 'react';
import { Link, LinkProps , NavLink } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './AppLink.module.scss';


export type AppLinkVariant = 'primary' | 'red';

export interface AppLinkProps extends LinkProps {
	className?: string;
	activeLinkClass?: string;
	variant?: AppLinkVariant;
	children?: ReactNode;
}
/**
 * Используем новые компоненты из папки redesigned
 */
export const AppLink: FC<AppLinkProps> = memo((props: AppLinkProps) => {
	const { to, className, activeLinkClass = '', variant = 'primary', children, ...otherProps } = props;

	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				classNames(classes.applink, { [activeLinkClass]: isActive }, [className, classes[variant]])
			}
			{...otherProps}
		>
			{children}
		</NavLink>
	);
});
