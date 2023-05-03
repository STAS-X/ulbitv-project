import { FC, lazy } from 'react';

export const MainPageLazy: FC = lazy(() => new Promise((resolve) => import('./MainPage')));
