import { ArticlesPage } from 'pages/ArticlesPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { RouteProps } from 'react-router-dom';
import { ArticleDetailesPage } from 'pages/ArticleDetailesPage';
import { ArticleEditPage } from 'pages/ArticleEditPage';

export enum AppRoutes {
	MAIN = 'main',
	ABOUT = 'about',
	PROFILE = 'profile',
	ARTICLES = 'articles',
	ARTICLE_DETAILES = 'article_detailes',
	ARTICLE_CREATE = 'article_create',
	ARTICLE_EDIT = 'article_edit',
	NOT_FOUND = 'not_found'
}

export interface AuthRouteProps extends RouteProps {
	isAuth?: boolean;
	pathname: string;
	Element: React.FC;
}

export const RoutePath: Record<AppRoutes, AuthRouteProps> = {
	[AppRoutes.MAIN]: {
		pathname: '/',
		Element: MainPage
	},
	[AppRoutes.ABOUT]: {
		pathname: '/about',
		Element: AboutPage
	},
	[AppRoutes.PROFILE]: {
		pathname: '/profile/:id',
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
	[AppRoutes.ARTICLE_CREATE]: {
		pathname: '/articles/create',
		isAuth: true,
		Element: ArticleEditPage
	},
	[AppRoutes.ARTICLE_EDIT]: {
		pathname: '/articles/:id/edit',
		isAuth: true,
		Element: ArticleEditPage
	},
	[AppRoutes.NOT_FOUND]: {
		pathname: '*',
		Element: NotFoundPage
	}
};
