import { FC, lazy } from 'react';

export const ProfilePageLazy: FC = lazy(
	() => new Promise<{ default: FC<{}> }>((resolve) => resolve(import('./ProfilePage')))
);
