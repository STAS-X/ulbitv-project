import { FC, memo, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

export interface AppLinkProps extends LinkProps {
	className?: string;
	variant?: AppLinkVariant;
	children?: ReactNode;
}
/**
 * Компонент устарел, используем новые компоненты из папки redesigned
 * @depricated
 */
export const AppLink: FC<AppLinkProps> = memo((props: AppLinkProps) => {
	const { to, className, variant = 'primary', children, ...otherProps } = props;

	return (
		<Link to={to} className={classNames(classes.applink, {}, [className, classes[variant]])} {...otherProps}>
			{children}
		</Link>
	);
});
