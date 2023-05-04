import { FC, lazy } from 'react';

export const MainPageLazy: FC = lazy(
	() => new Promise<{ default: FC<{}> }>((resolve) => resolve(import('./MainPage')))
);
