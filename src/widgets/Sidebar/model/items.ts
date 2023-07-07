import { getRouteAbout, getRouteMain, getRouteProfile, getRouteArticles, AppRoutes } from '@/shared/config/routeConfig';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg';
import React from 'react';
export interface SidebarItemType {
	path: string;
	text: string;
	isAuth: boolean;
	Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const SidebarItemsList: SidebarItemType[] = [
	{
		path: getRouteMain(),
		Icon: MainIcon,
		isAuth: false,
		text: 'main'
	},
	{
		path: getRouteAbout(),
		Icon: AboutIcon,
		isAuth: false,
		text: 'about'
	},
	{
		path: AppRoutes.PROFILE,
		Icon: ProfileIcon,
		isAuth: true,
		text: 'profile'
	},
	{
		path: getRouteArticles(),
		Icon: ArticleIcon,
		isAuth: true,
		text: 'articles'
	}
];

export const configSideBarItem = (isAuth: boolean) => {
	return SidebarItemsList.filter((item) => item.isAuth === isAuth || item.isAuth === false);
};
