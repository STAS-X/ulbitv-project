import { Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from 'widgets/PageLoader/PageLoader';
import { AuthRouteProps } from 'shared/config/routeConfig/routeConfig';
import { routeConfig } from '../path/Routes';
import { RequireAuth } from './RequireAuth';

export const AppRouter = () => {
	//const isAuth = Boolean(useSelector(getUserData));
	const renderWithAuthWrapper = useCallback((route: AuthRouteProps) => {
		const element = (
			<Suspense fallback={<PageLoader />}>
				<div className="page-wrapper">{<route.Element />}</div>
			</Suspense>
		);

		return (
			<Route
				key={route.pathname}
				index={!!route.index}
				path={route.pathname}
				element={!!route.isAuth ? <RequireAuth>{element}</RequireAuth> : element}
			/>
		);
	}, []);

	return <Routes>{routeConfig().map(renderWithAuthWrapper)}</Routes>;
};
