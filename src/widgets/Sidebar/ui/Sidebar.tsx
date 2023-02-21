import { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitchButton } from 'widgets/ThemeSwitcher';
import { LanguageSwitchButton } from 'widgets/LanguageSwitcher/';
import classes from './Sidebar.module.scss';

interface SidebarProps {
	className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false);

	const onToggle = () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<div
			data-testid="sidebar"
			className={classNames(
				classes.sidebar,
				{ [classes.collapsed]: collapsed },
				[className]
			)}
		>
			<div className={classes.switchers}>
				<button data-testid="sidebar-toggle" type="button" onClick={onToggle}>
					Toggle
				</button>
				<ThemeSwitchButton />
				<LanguageSwitchButton className={classes.lang} />
			</div>
		</div>
	);
};
