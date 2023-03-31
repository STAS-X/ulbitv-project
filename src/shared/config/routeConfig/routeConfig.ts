import { ArticleDetailesPage } from './../../../pages/ArticleDetailesPage/ui/ArticleDetailesPage/ArticleDetailesPage';
import { ArticlesPage } from './../../../pages/ArticlesPage/ui/ArticlesPage/ArticlesPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { RouteProps } from 'react-router-dom';
import { FC } from 'react';

export enum AppRoutes {
	MAIN = 'main',
	ABOUT = 'about',
	PROFILE = 'profile',
	ARTICLES = 'articles',
	ARTICLE_DETAILES = 'article_detailes',
	NOT_FOUND = 'not_found'
}

export interface AuthRouteProps extends RouteProps {
	isAuth?: boolean;
	pathname?: string;
	Element: React.FC;
}

export const RoutePath: Record<AppRoutes, AuthRouteProps> = {
	[AppRoutes.MAIN]: {
		pathname: '/',
		isAuth: false,
		Element: MainPage
	},
	[AppRoutes.ABOUT]: {
		pathname: '/about',
		isAuth: false,
		Element: AboutPage
	},
	[AppRoutes.PROFILE]: {
		pathname: '/profile',
		isAuth: true,
		Element: ProfilePage
	},
	[AppRoutes.ARTICLES]: {
		pathname: '/articles',
		isAuth: true,
		Element: ArticlesPage
	},
	[AppRoutes.ARTICLE_DETAILES]: {
		pathname: '/articles/:id',
		isAuth: true,
		Element: ArticleDetailesPage
	},
	[AppRoutes.NOT_FOUND]: {
		pathname: '*',
		isAuth: false,
		Element: NotFoundPage
	}
};
