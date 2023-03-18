import { FC, memo } from 'react';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import classes from './SidebarItem.module.scss';
import { useTranslation } from 'react-i18next';
import { SidebarItemType } from '../../model/items';
import { classNames } from 'shared/lib/classNames/classNames';

interface SidebarItemProps {
	item?: SidebarItemType;
	collapsed: boolean;
}

export const SidebarItem: FC<SidebarItemProps> = memo((props) => {
	const { item, collapsed } = props;
	const { t } = useTranslation(['pages']);

	return (
		<AppLink
			theme={AppLinkTheme.SECONDARY}
			className={classNames(classes.item, { [classes.collapsed]: collapsed })}
			to={item.path}
		>
			<item.Icon className={classes.icon} />
			<span className={classes.link}>{collapsed ? '\u00A0' : t(item.text)}</span>
		</AppLink>
	);
});
