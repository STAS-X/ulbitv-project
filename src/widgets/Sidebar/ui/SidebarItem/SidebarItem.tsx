import { FC, memo, MouseEventHandler } from 'react';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink/AppLink';
import { AppLink as AppLinkRedesign, AppLinkVariant } from '@/shared/ui/redesign/AppLink/AppLink';
import classes from './SidebarItem.module.scss';
import { useTranslation } from 'react-i18next';
import { SideBarItemType } from '../../model/items';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppRoutes, getRouteProfile } from '@/shared/config/routeConfig';
import { useNavigate } from '@/shared/lib/hooks/useRouterUtils';
import { Icon } from '@/shared/ui/deprecated/Icon/Icon';
import { Icon as IconRedesign } from '@/shared/ui/redesign/Icon/Icon';

interface SidebarItemProps {
	item?: SideBarItemType;
	userId?: string;
	className?: string;
	collapsed: boolean;
	redesigned?: boolean;
}

export const SidebarItem: FC<SidebarItemProps> = memo((props: SidebarItemProps) => {
	const { item, collapsed, redesigned = false, userId, className } = props;
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
	console.log(redesigned, 'side component redesigned');

	const ItemIcon = item.Icon();

	return redesigned ? (
		<AppLinkRedesign
			onClick={refreshPage}
			className={classNames(classes.item, { [classes.collapsed]: collapsed }, [className])}
			to={item.path}
		>
			<IconRedesign Svg={item.Icon()} width={collapsed ? 32 : 40} height={collapsed ? 32 : 40} />
			<span className={classes.link}>{collapsed ? '\u00A0' : t(item.text)}</span>
		</AppLinkRedesign>
	) : (
		<AppLink
			theme={AppLinkTheme.SECONDARY}
			onClick={refreshPage}
			className={classNames(classes.item, { [classes.collapsed]: collapsed }, [className])}
			to={item.path}
		>
			<Icon Svg={item.Icon()} />
			<span className={classes.link}>{collapsed ? '\u00A0' : t(item.text)}</span>
		</AppLink>
	);
});
