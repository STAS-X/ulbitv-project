import { FC, lazy } from 'react';

export const MainPageLazy: FC = lazy(
	() => new Promise<{ default: FC<Record<string, unknown>> }>((resolve) => resolve(import('./MainPage')))
);
