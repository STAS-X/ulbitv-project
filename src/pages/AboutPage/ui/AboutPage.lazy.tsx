import { FC, lazy } from 'react';

export const AboutPageLazy: FC = lazy(
	() =>
		new Promise<{ default: FC<{}> }>(
			(resolve) => resolve(import('./AboutPage'))
			//setTimeout(() => resolve(import('./AboutPage')), 1000);
		)
);
