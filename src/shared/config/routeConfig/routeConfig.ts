import { AppRoutes, AuthRouteProps } from '.';
import { ArticlesPage } from 'pages/ArticlesPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { ArticleDetailesPage } from 'pages/ArticleDetailesPage';
import { ArticleEditPage } from 'pages/ArticleEditPage';
import { AdminPanelPage } from 'pages/AdminPanelPage';
import { ForbiddenPage } from 'pages/ForbiddenPage';

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
	[AppRoutes.ADMIN_PANEL]: {
		pathname: '/adminka',
		roles: ['admin', 'manager'],
		Element: AdminPanelPage
	},
	[AppRoutes.NOT_FOUND]: {
		pathname: '*',
		Element: NotFoundPage
	},
	[AppRoutes.FORBIDDEN]: {
		pathname: '/forbidden',
		Element: ForbiddenPage
	}
};
