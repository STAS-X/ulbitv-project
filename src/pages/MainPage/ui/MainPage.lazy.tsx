import { lazy } from 'react';

export const MainPageLazy = lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(() => resolve(import('./MainPage') as never), 1000);
		})
);
