import { FC, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from '@/widgets/PageLoader';
import { AuthRouteProps } from '@/shared/config/routeConfig';
import { routeConfig } from '../path/Routes';
import { RequireAuth } from './RequireAuth';

export const AppRouter: FC = () => {
	//const isAuth = Boolean(useSelector(getUserData));

	const renderWithAuthWrapper = useCallback((route: AuthRouteProps) => {
		const element = (
			<Suspense fallback={<PageLoader />}>
				<main>{<route.Element />}</main>
			</Suspense>
		);

		return (
			<Route
				key={route.pathname}
				index={!!route.index}
				path={route.pathname}
				element={
					!!route.isAuth ? (
						<RequireAuth roles={route.roles} isAuth={!!route.isAuth}>
							{element}
						</RequireAuth>
					) : (
						element
					)
				}
			/>
		);
	}, []);

	return <Routes>{routeConfig().map(renderWithAuthWrapper)}</Routes>;
};
