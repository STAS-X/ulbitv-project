import { FC, memo, MouseEventHandler } from 'react';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import classes from './SidebarItem.module.scss';
import { useTranslation } from 'react-i18next';
import { SidebarItemType } from '../../model/items';
import { classNames } from 'shared/lib/classNames/classNames';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarItemProps {
	item?: SidebarItemType;
	collapsed: boolean;
}

export const SidebarItem: FC<SidebarItemProps> = memo((props: SidebarItemProps) => {
	const { item, collapsed } = props;
	const { t } = useTranslation(['pages']);

	const navigate = useNavigate();
	const location = useLocation();

	const refreshPage: MouseEventHandler<HTMLAnchorElement> = (e) => {
		if (location.pathname === RoutePath.profile && item?.path === RoutePath.profile) {
			e.preventDefault();
			setTimeout(() => {
				navigate('/');
				navigate(RoutePath.profile, { replace: true });
			}, 0);
			//return false;
		}
	};

	if (!item) return null;

	return (
		<AppLink
			theme={AppLinkTheme.SECONDARY}
			onClick={refreshPage}
			className={classNames(classes.item, { [classes.collapsed]: collapsed })}
			to={item.path}
		>
			<item.Icon className={classes.icon} />
			<span className={classes.link}>{collapsed ? '\u00A0' : t(item.text)}</span>
		</AppLink>
	);
});
