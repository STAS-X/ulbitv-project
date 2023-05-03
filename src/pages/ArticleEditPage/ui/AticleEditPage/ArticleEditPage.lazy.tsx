import { FC, lazy } from 'react';

export const ArticleEditPageLazy: FC = lazy(() => new Promise((resolve) => import('./ArticleEditPage')));
