import { FC, lazy } from 'react';

export const ArticlesPageLazy: FC = lazy(
	() => new Promise<{ default: FC<Record<string, unknown>> }>((resolve) => resolve(import('./ArticlesPage')))
);
