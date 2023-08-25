import { FC, lazy } from 'react';

export const SettingsPageLazy: FC = lazy(
	() => new Promise<{ default: FC<Record<string, unknown>> }>((resolve) => resolve(import('./SettingsPage')))
);
