import { FC, lazy } from 'react';

export const ArticleDetailesPageLazy: FC = lazy(
	() => new Promise<{ default: FC<Record<string, unknown>> }>((resolve) => resolve(import('./ArticleDetailesPage')))
);
