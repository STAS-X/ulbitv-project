import { FC, lazy } from 'react';

export const ProfilePageLazy: FC = lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(() => resolve(import('./ProfilePage') as never), 1000);
		})
);
