import { FC, lazy } from 'react';

export const ArticlesPageLazy: FC = lazy(() => new Promise((resolve) => import('./ArticlesPage')));
