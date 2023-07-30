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

export interface SideBarProps {
	className?: string;
}

const SideBarComponent = memo((props: SideBarProps) => {
	const { className = classes.SideBar } = props;

	const isRedesigned = className !== classes.SideBar;

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
		handleCollapsedElement(pageContent as HTMLElement, isRedesigned, 'content-page-redesign');
		handleCollapsedElement(
			pageContent as HTMLElement,
			collapsed,
			isRedesigned ? 'content-page-redesign-collapsed' : 'content-page-collapsed'
		);

		handleCollapsedElement(pageHeader as HTMLElement, collapsed, 'articles-header-collapsed');
	}, [collapsed, isRedesigned]);

	const onToggle = () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<aside
			data-testid="SideBar"
			className={classNames(className, { [classes.collapsed]: collapsed }, [classes.animation])}
		>
			<Button
				data-testid="SideBar-toggle"
				type="button"
				className={isRedesigned ? classes.collapsebtnredesign : classes.collapsebtn}
				theme={ButtonTheme.BACKGROUND_INVERTED}
				onClick={onToggle}
				size={ButtonSize.L}
				square
			>
				{collapsed ? '>' : '<'}
			</Button>
			<VStack role={'navigation'} className={classes.items} gap={10}>
				{configSideBarItem(Boolean(authData)).map((item) => (
					<SideBarItem key={item.path} collapsed={collapsed} userId={authData?.id} item={item} />
				))}
			</VStack>
			<div className={classes.collapsebtn ? classes.switchersredesign : classes.switchers}>
				<ThemeSwitchButton />
				<LanguageSwitchButton short={collapsed} className={classes.lang} />
			</div>
		</aside>
	);
});

export const SideBar: FC<SideBarProps> = () => {
	return (
		<ToggleFeatures
			feature={'isAppRedesined'}
			off={<SideBarComponent className={classes.sidebar} />}
			on={<SideBarComponent className={classes.sidebarredesigned} />}
		/>
	);
};
