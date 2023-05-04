import { FC, lazy } from 'react';

export const ArticleDetailesPageLazy: FC = lazy(
	() => new Promise<{ default: FC<{}> }>((resolve) => resolve(import('./ArticleDetailesPage')))
);
