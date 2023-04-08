import { AddCommentFormSchema } from '../..';
import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

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
