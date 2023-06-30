import { FC, memo, MouseEventHandler } from 'react';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import classes from './SidebarItem.module.scss';
import { useTranslation } from 'react-i18next';
import { SidebarItemType } from '../../model/items';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppRoutes } from '@/shared/config/routeConfig';
import { useNavigate } from '@/shared/lib/hooks/useRouterUtils';
import { getRouteProfile } from '@/shared/config/routeConfig/routeConfig';

interface SidebarItemProps {
	item?: SidebarItemType;
	userId?: string;
	collapsed: boolean;
}

export const SidebarItem: FC<SidebarItemProps> = memo((props: SidebarItemProps) => {
	const { item, collapsed, userId } = props;
	const { t } = useTranslation(['pages']);

	const navigate = useNavigate();
	//const location = useLocation();

	const refreshPage: MouseEventHandler<HTMLAnchorElement> = (e) => {
		if (item?.path.indexOf(AppRoutes.PROFILE) === 0) {
			e.preventDefault();
			setTimeout(() => {
				//navigate('/');
				if (userId) navigate(getRouteProfile(`${userId}`), { replace: true });
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
