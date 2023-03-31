import { FC, lazy } from 'react';

export const ArticlesPageLazy: FC = lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(() => resolve(import('./ArticlesPage') as never), 1000);
		})
);
