import { FC, lazy } from 'react';

export const ProfilePageLazy: FC = lazy(
	() => new Promise<{ default: FC<Record<string, unknown>> }>((resolve) => resolve(import('./ProfilePage')))
);
