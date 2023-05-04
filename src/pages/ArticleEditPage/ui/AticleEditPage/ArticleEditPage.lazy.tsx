import { FC, lazy } from 'react';

export const ArticleEditPageLazy: FC = lazy(() => new Promise<{ default: FC<{}> }>((resolve) => resolve(import('./ArticleEditPage'))));
