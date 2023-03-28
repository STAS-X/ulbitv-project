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
	[AppRoutes.NOT_FOUND]: {
		pathname: '*',
		isAuth: false,
		Element: NotFoundPage
	}
};
