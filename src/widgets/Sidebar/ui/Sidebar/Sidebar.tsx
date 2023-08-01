import { useState, memo, useEffect, FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Sidebar.module.scss';
import { ButtonTheme, Button, ButtonSize } from '@/shared/ui/Button/Button';
import { SideBarItem } from '../SideBarItem/SideBarItem';
import { getUserData } from '@/entities/User';
import { useSelector } from 'react-redux';
import { configSideBarItem } from '../../model/items';
import { VStack } from '@/shared/ui/Stack/VStack/VStack';
import { LanguageSwitchButton } from '@/features/LanguageSwitcher';
import { ThemeSwitchButton } from '@/features/ThemeSwitcher';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';
import { AppLogo } from '@/shared/ui/AppLogo/AppLogo';

export interface SidebarProps {
	className?: string;
}

const SideBarComponent = memo((props: SidebarProps) => {
	const { className = classes.Sidebar } = props;

	const isRedesigned = className !== classes.Sidebar;

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
		const pageContent = document.querySelector('div[class^="content-page"]');
		const pageHeader = document.querySelector('div.articles-header');
		handleCollapsedElement(pageContent as HTMLElement, collapsed, 'collapsed');
		handleCollapsedElement(pageHeader as HTMLElement, collapsed, 'collapsed');
	}, [collapsed, isRedesigned]);

	const onToggle = () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<aside
			data-testid="Sidebar"
			className={classNames(className, { [classes.collapsed]: collapsed }, [classes.animation])}
		>
			<VStack role={'navigation'} gap={16}>
				<AppLogo className={collapsed ? classes.appiconsmall : classes.appicon} isSmall={collapsed} />
				{configSideBarItem(Boolean(authData)).map((item) => (
					<SideBarItem
						key={item.path}
						className={classes.items}
						collapsed={collapsed}
						userId={authData?.id}
						item={item}
					/>
				))}
			</VStack>
			<div className={classes.collapsebtn ? classes.switchersredesign : classes.switchers}>
				<ThemeSwitchButton />
				<LanguageSwitchButton short={collapsed} className={classes.lang} />
				<Button
					data-testid="Sidebar-toggle"
					type="button"
					className={classNames(isRedesigned ? classes.collapsebtnredesign : classes.collapsebtn, {
						[classes.collapsed]: collapsed
					})}
					theme={ButtonTheme.BACKGROUND_INVERTED}
					onClick={onToggle}
					size={ButtonSize.L}
					square
				>
					{collapsed ? '>' : '<'}
				</Button>
			</div>
		</aside>
	);
});

export const Sidebar: FC<SidebarProps> = () => {
	return (
		<ToggleFeatures
			feature={'isAppRedesined'}
			off={<SideBarComponent className={classes.Sidebar} />}
			on={<SideBarComponent className={classes.sidebarredesigned} />}
		/>
	);
};
