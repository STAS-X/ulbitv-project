import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './AppLink.module.scss';

export enum AppLinkTheme {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
}

export interface AppLinkProps extends LinkProps {
	className?: string;
	theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = (props) => {
	const {
		to,
		className,
		theme = AppLinkTheme.PRIMARY,
		children,
		...otherProps
	} = props;

	return (
		<Link
			to={to}
			className={classNames(classes.applink, {}, [className, classes[theme]])}
			{...otherProps}
		>
			{children}
		</Link>
	);
};
