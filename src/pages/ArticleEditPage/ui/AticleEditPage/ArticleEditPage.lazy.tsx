import { FC, lazy } from 'react';

export const ArticleEditPageLazy: FC = lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(() => resolve(import('./ArticleEditPage') as never), 1000);
		})
);
