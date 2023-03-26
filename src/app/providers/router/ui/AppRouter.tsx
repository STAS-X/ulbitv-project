import { getUserData } from 'entities/User';
import { ProfilePage } from 'pages/ProfilePage';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from 'widgets/PageLoader/PageLoader';
import { routeConfig } from '../path/Routes';

export const AppRouter = () => {
	const isAuth = Boolean(useSelector(getUserData));

	return (
		<Suspense fallback={<PageLoader />}>
			<Routes>
				{routeConfig(isAuth).map(({ pathname, Element, index }) => (
					<Route
						key={pathname}
						index={!!index}
						path={pathname || '/'}
						element={<div className="page-wrapper">{<Element />}</div>}
					/>
				))}
			</Routes>
		</Suspense>
	);
};
