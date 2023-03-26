import { FC, lazy } from 'react';

export const MainPageLazy: FC = lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(() => resolve(import('./MainPage') as never), 1000);
		})
);
