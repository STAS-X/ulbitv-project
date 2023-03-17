import { useState, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitchButton } from 'widgets/ThemeSwitcher';
import { LanguageSwitchButton } from 'widgets/LanguageSwitcher/';
import classes from './Sidebar.module.scss';
import { ButtonTheme, Button, ButtonSize } from 'shared/ui/Button/Button';
import { SidebarItemsList } from '../../model/items';
import { SidebarItem } from '../SidebarItem/SidebarItem';

export interface SidebarProps {
	className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false);

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
				{SidebarItemsList.map((item) => (
					<SidebarItem key={item.path} collapsed={collapsed} item={item} />
				))}
			</div>
			<div className={classes.switchers}>
				<ThemeSwitchButton />
				<LanguageSwitchButton short={collapsed} className={classes.lang} />
			</div>
		</div>
	);
});
