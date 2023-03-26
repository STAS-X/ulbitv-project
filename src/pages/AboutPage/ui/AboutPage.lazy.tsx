import { FC, lazy } from 'react';

export const AboutPageLazy: FC = lazy(
	() =>
		new Promise((resolve) => {
			// @ts-ignore
			setTimeout(() => resolve(import('./AboutPage')), 1000);
		})
);
