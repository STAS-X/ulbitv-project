import { ResultType } from '@remix-run/router/dist/utils';
import React, { lazy, ReactElement } from 'react';

export const AboutPageLazy = lazy(
	() =>
		new Promise((resolve) => {
            //@ts-ignore
			setTimeout(() => resolve(import('./AboutPage')), 1000);
		})
);
