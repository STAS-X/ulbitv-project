/* eslint-disable stas-eslint-plugin/layer-imports */
import { AppRoutes, AuthRouteProps } from '.';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { AboutPage } from '@/pages/AboutPage';
import { MainPage } from '@/pages/MainPage';
import { ArticleDetailesPage } from '@/pages/ArticleDetailesPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleDetailes = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => '/articles/create';
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdminPanel = () => '/adminka';
export const getRouteForbidden = () => '/forbidden';
export const getRouteNotFound = () => '*';

export const RoutePath: Record<AppRoutes, AuthRouteProps> = {
	[AppRoutes.MAIN]: {
		pathname: getRouteMain(),
		Element: MainPage
	},
	[AppRoutes.ABOUT]: {
		pathname: getRouteAbout(),
		Element: AboutPage
	},
	[AppRoutes.PROFILE]: {
		pathname: getRouteProfile(':id'),
		isAuth: true,
		Element: ProfilePage
	},
	[AppRoutes.ARTICLES]: {
		pathname: getRouteArticles(),
		isAuth: true,
		Element: ArticlesPage
	},
	[AppRoutes.ARTICLE_DETAILES]: {
		pathname: getRouteArticleDetailes(':id'),
		isAuth: true,
		Element: ArticleDetailesPage
	},
	[AppRoutes.ARTICLE_CREATE]: {
		pathname: getRouteArticleCreate(),
		isAuth: true,
		Element: ArticleEditPage
	},
	[AppRoutes.ARTICLE_EDIT]: {
		pathname: getRouteArticleEdit(':id'),
		isAuth: true,
		Element: ArticleEditPage
	},
	[AppRoutes.ADMIN_PANEL]: {
		pathname: getRouteAdminPanel(),
		roles: ['admin', 'manager'],
		isAuth: true,
		Element: AdminPanelPage
	},
	[AppRoutes.NOT_FOUND]: {
		pathname: getRouteNotFound(),
		Element: NotFoundPage
	},
	[AppRoutes.FORBIDDEN]: {
		pathname: getRouteForbidden(),
		Element: ForbiddenPage
	}
};
