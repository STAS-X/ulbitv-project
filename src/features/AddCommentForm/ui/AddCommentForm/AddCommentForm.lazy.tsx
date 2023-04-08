import { FC, lazy } from 'react';

export const AddCommentFormLazy: FC = lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(() => resolve(import('./AddCommentForm') as never), 1000);
		})
);
