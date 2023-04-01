import { FC, lazy } from 'react';

export const ArticleDetailesPageLazy: FC = lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(() => resolve(import('./ArticleDetailesPage') as never), 1000);
		})
);
