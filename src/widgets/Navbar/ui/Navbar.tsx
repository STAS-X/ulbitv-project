import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import classes from './Navbar.module.scss';

export interface NavbarProps {
	className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
	const { t } = useTranslation(['pages']);

	return (
		<div className={classNames(classes.navbar, {}, [className])}>
			<div className={classes.links}>
				<AppLink theme={AppLinkTheme.SECONDARY} className={classes.mainlink} to="/">
					{t('main')}
				</AppLink>
				<AppLink theme={AppLinkTheme.SECONDARY} to="/about">
					{t('about')}
				</AppLink>
			</div>
		</div>
	);
};
