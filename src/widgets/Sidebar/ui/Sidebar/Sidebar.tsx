import { useState, memo, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitchButton } from 'widgets/ThemeSwitcher';
import { LanguageSwitchButton } from 'widgets/LanguageSwitcher/';
import classes from './Sidebar.module.scss';
import { ButtonTheme, Button, ButtonSize } from 'shared/ui/Button/Button';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getUserData } from 'entities/User';
import { useSelector } from 'react-redux';
import { configSideBarItem } from '../../model/items';
import { VStack } from '../../../../shared/ui/Stack/VStack/VStack';

export interface SidebarProps {
	className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false);
	const authData = useSelector(getUserData);

	const handleCollapsedElement = (element: HTMLElement, collapsed: boolean, className: string) => {
		if (element) {
			if (
				(collapsed && !element.classList.contains(className)) ||
				(!collapsed && element.classList.contains(className))
			)
				element.classList.toggle(className);
		}
	};

	useEffect(() => {
		const pageContent = document.querySelector('div.content-page');
		const pageHeader = document.querySelector('div.articles-header');
		handleCollapsedElement(pageContent as HTMLElement, collapsed, 'content-page-collapsed');
		handleCollapsedElement(pageHeader as HTMLElement, collapsed, 'articles-header-collapsed');
	}, [collapsed]);

	const onToggle = () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<menu
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
			<VStack className={classes.items} gap={10}>
				{configSideBarItem(Boolean(authData)).map((item) => (
					<SidebarItem key={item.path} collapsed={collapsed} userId={authData?.id} item={item} />
				))}
			</VStack>
			<div className={classes.switchers}>
				<ThemeSwitchButton />
				<LanguageSwitchButton short={collapsed} className={classes.lang} />
			</div>
		</menu>
	);
});
