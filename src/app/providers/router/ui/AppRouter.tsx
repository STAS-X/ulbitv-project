import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../path/Routes';

export const AppRouter = () => {
	return (
		<Suspense fallback={<div>Loading routes...</div>}>
			<Routes>
				{Object.values(routeConfig).map(({ path, element, index }) => (
					<Route index={index ? true : false} path={path} element={element} />
				))}
			</Routes>
		</Suspense>
	);
};
