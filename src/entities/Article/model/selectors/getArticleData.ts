import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleDetailesSchema } from '../types/articleDetailesSchema';

export const getArticle = (state: StateSchema) => state?.articleDetailes;
export const getArticleData = createSelector(
	getArticle,
	(articleDetailes: ArticleDetailesSchema | undefined) => articleDetailes?.data
);
export const getArticleError = createSelector(
	getArticle,
	(articleDetailes: ArticleDetailesSchema | undefined) => articleDetailes?.error
);
export const getArticleIsLoading = createSelector(
	getArticle,
	(articleDetailes: ArticleDetailesSchema | undefined) => articleDetailes?.isLoading
);
