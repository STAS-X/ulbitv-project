import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { ThemeSwitchButton } from 'widgets/ThemeSwitch';
import classes from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
	return (
		<div className={classNames(classes.navbar, {}, [className])}>
			<ThemeSwitchButton />
			<div className={classes.links}>
				<AppLink
					theme={AppLinkTheme.SECONDARY}
					className={classes.mainLink}
					to={'/'}
				>
					Главная
				</AppLink>
				<AppLink theme={AppLinkTheme.SECONDARY} to={'/about'}>
					О сайте
				</AppLink>
			</div>
		</div>
	);
};
