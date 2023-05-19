import { FC, lazy } from 'react';
import { AddCommentFormProps } from './AddCommentForm';

export const AddCommentFormLazy: FC<AddCommentFormProps> = lazy(
	() => new Promise<{ default: FC<AddCommentFormProps> }>((resolve) => resolve(import('./AddCommentForm')))
);
