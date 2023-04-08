import { useState, memo, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitchButton } from 'widgets/ThemeSwitcher';
import { LanguageSwitchButton } from 'widgets/LanguageSwitcher/';
import classes from './Sidebar.module.scss';
import { ButtonTheme, Button, ButtonSize } from 'shared/ui/Button/Button';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getUserData } from 'entities/User';
import { useSelector } from 'react-redux';
import { configSideBarItem } from 'widgets/Sidebar/model/items';

export interface SidebarProps {
	className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false);
	const authData = useSelector(getUserData);

	useEffect(() => {
		const pageContent = document.querySelector('div.content-page');
		console.log(pageContent, 'get pageContent element');
		if (pageContent) {
			if (
				(collapsed && !pageContent.classList.contains('content-page-collapsed')) ||
				(!collapsed && pageContent.classList.contains('content-page-collapsed'))
			)
				pageContent.classList.toggle('content-page-collapsed');
		}
	}, [collapsed]);

	const onToggle = () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<div
			data-testid="sidebar"
			className={classNames(classes.sidebar, { [classes.collapsed]: collapsed }, [className ?? ''])}
		>
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
				{configSideBarItem(Boolean(authData)).map((item) => (
					<SidebarItem key={item.path} collapsed={collapsed} userId={authData?.id} item={item} />
				))}
			</div>
			<div className={classes.switchers}>
				<ThemeSwitchButton />
				<LanguageSwitchButton short={collapsed} className={classes.lang} />
			</div>
		</div>
	);
});
