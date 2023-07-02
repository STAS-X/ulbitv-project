import { AddCommentFormSchema } from '../types/addCommentForm';
import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getAddComment = (state?: StateSchema) => state?.addCommentForm;
export const getAddCommentError = createSelector(
	getAddComment,
	(addCommentForm: AddCommentFormSchema | undefined) => addCommentForm?.error
);
export const getAddCommentIsLoading = createSelector(
	getAddComment,
	(addCommentForm: AddCommentFormSchema | undefined) => addCommentForm?.isLoading
);
export const getAddCommentContent = createSelector(
	getAddComment,
	(addCommentForm: AddCommentFormSchema | undefined) => addCommentForm?.content
);
