import { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitchButton } from 'widgets/ThemeSwitcher';
import { LanguageSwitchButton } from 'widgets/LanguageSwitcher/';
import classes from './Sidebar.module.scss';
import { useTranslation } from 'react-i18next';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import { ButtonTheme, Button, ButtonSize } from 'shared/ui/Button/Button';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export interface SidebarProps {
	className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false);
	const { t } = useTranslation(['pages', 'translation']);

	const onToggle = () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<div data-testid="sidebar" className={classNames(classes.sidebar, { [classes.collapsed]: collapsed }, [className])}>
			<Button
				data-testid="sidebar-toggle"
				type="button"
				className={classes.collapsebtn}
				theme={ButtonTheme.BACKGROUND_INVERTED}
				onClick={onToggle}
				size={ButtonSize.L}
				square
			>
				{collapsed ? '>' : '<'}
			</Button>
			<div className={classes.items}>
				<AppLink theme={AppLinkTheme.SECONDARY} className={classes.item} to={RoutePath.main}>
					<MainIcon className={classes.icon} />
					<span className={classes.link}>{t('main')}</span>
				</AppLink>
				<AppLink theme={AppLinkTheme.SECONDARY} className={classes.item} to={RoutePath.about}>
					<AboutIcon className={classes.icon} />
					<span className={classes.link}>{t('about')}</span>
				</AppLink>
			</div>
			<div className={classes.switchers}>
				<ThemeSwitchButton />
				<LanguageSwitchButton short={collapsed} className={classes.lang} />
			</div>
		</div>
	);
};
