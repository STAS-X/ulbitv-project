import { FC, lazy } from 'react';

export const AddCommentFormLazy: FC = lazy(
	() => new Promise<{ default: FC<{} | any> }>((resolve) => resolve(import('./AddCommentForm')))
);
