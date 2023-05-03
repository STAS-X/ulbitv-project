import { FC, lazy } from 'react';

export const ArticleDetailesPageLazy: FC = lazy(() => new Promise((resolve) => import('./ArticleDetailesPage')));
