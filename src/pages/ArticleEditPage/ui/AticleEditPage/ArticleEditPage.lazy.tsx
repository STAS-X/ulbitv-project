import { FC, lazy } from 'react';

export const ArticleEditPageLazy: FC = lazy(
	() => new Promise<{ default: FC<Record<string, unknown>> }>((resolve) => resolve(import('./ArticleEditPage')))
);
