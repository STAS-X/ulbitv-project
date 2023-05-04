import { FC, lazy } from 'react';

export const AddCommentFormLazy: FC = lazy(
	() => new Promise<{ default: FC<Record<string, unknown>> }>((resolve) => resolve(import('./AddCommentForm')))
);
