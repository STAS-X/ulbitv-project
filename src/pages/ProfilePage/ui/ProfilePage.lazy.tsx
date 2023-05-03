import { FC, lazy } from 'react';

export const ProfilePageLazy: FC = lazy(() => new Promise((resolve) => import('./ProfilePage')));
