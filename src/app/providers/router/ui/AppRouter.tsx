import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from 'widgets/PageLoader/PageLoader';
import { routeConfig } from '../path/Routes';

export const AppRouter = () => (
	<Suspense fallback={<PageLoader />}>
		<Routes>
			{Object.values(routeConfig).map(({ path, element, index }, num) => (
				<Route
					key={num}
					index={!!index}
					path={path}
					element={<div className="page-wrapper">{element}</div>}
				/>
			))}
		</Routes>
	</Suspense>
);
