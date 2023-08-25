import { getRouteAbout, getRouteMain, getRouteArticles, AppRoutes } from '@/shared/config/routeConfig';
import { useFeaturesByKey } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import SettingsIcon from '@/shared/assets/icons/settings-32.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg';
import AboutIconRedesign from '@/shared/assets/icons/about.svg';
import MainIconRedesign from '@/shared/assets/icons/home.svg';
import SettingsIconRedesign from '@/shared/assets/icons/settings.svg';
import ProfileIconRedesign from '@/shared/assets/icons/profile.svg';
import ArticleIconRedesign from '@/shared/assets/icons/article.svg';
import React from 'react';

const toggleIcons = (oldIcon: React.FC<React.SVGProps<SVGSVGElement>>, newIcon: React.FC<React.SVGProps<SVGSVGElement>>) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const featureFlagValue = useFeaturesByKey('isAppRedesigned');

	if (featureFlagValue) {
		return newIcon;
	}
	return oldIcon
}


export interface SideBarItemType {
	path: string;
	text: string;
	isAuth: boolean;
	Icon: () => React.FC<React.SVGProps<SVGSVGElement>>;
}

export const SideBarItemsList: SideBarItemType[] = [
	{
		path: getRouteMain(),
		Icon: () => toggleIcons(MainIcon, MainIconRedesign),
		isAuth: false,
		text: 'main'
	},
	{
		path: getRouteAbout(),
		Icon: () => toggleIcons(AboutIcon, AboutIconRedesign),
		isAuth: false,
		text: 'about'
	},
	{
		path: AppRoutes.PROFILE,
		Icon: () => toggleIcons(ProfileIcon, ProfileIconRedesign),
		isAuth: true,
		text: 'profile'
	},
	{
		path: AppRoutes.SETTINGS,
		Icon: () => toggleIcons(SettingsIcon, SettingsIconRedesign),
		isAuth: true,
		text: 'settings'
	},	
	{
		path: getRouteArticles(),
		Icon: () => toggleIcons(ArticleIcon, ArticleIconRedesign),
		isAuth: true,
		text: 'articles'
	}
];

export const configSideBarItem = (isAuth: boolean) => {
	return SideBarItemsList.filter((item) => item.isAuth === isAuth || item.isAuth === false);
};
