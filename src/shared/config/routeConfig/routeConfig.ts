import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { RouteProps } from 'react-router-dom';
export enum AppAuthRoutes {
	PROFILE = 'profile',
}

export enum AppRoutes {
	MAIN = 'main',
	ABOUT = 'about',
	NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, RouteProps> = {
	[AppRoutes.MAIN]: {
		pathname: '/',
		element: <MainPage />
	}
		,
		[AppRoutes.ABOUT]: {
			pathname: '/about',
			element: <AboutPage/>
		},

			[AppRoutes.NOT_FOUND]: {
				pathname: '*',
				element: <Error
	};

		export const AuthRoutePath: Record<AppAuthRoutes, string> = {
			[AppAuthRoutes.MAIN]: '/',
			[AppAuthRoutes.ABOUT]: '/about',
			[AppAuthRoutes.PROFILE]: '/profile',
			[AppAuthRoutes.NOT_FOUND]: '*'
};
