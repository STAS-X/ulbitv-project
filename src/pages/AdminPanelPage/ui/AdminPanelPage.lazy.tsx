import { FC, lazy } from 'react';

export const AdminPanelPageLazy: FC = lazy(
	() =>
		new Promise<{ default: FC<Record<string, unknown>> }>(
			(resolve) => resolve(import('./AdminPanelPage'))
			//setTimeout(() => resolve(import('./AdminPanelPage')), 1000);
		)
);
