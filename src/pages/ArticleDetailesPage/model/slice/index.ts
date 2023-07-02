import { ArticleDetailesPageSchema } from './../types/index';
import { reducerArticleComments } from '../slice/articleDetailesCommentsSlice';
import { reducerDetailesRecommended } from '../slice/articleDetailesRecommendedSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const articleDetailesPageReducer = combineReducers<ArticleDetailesPageSchema>({
	comments: reducerArticleComments,
	recommendations: reducerDetailesRecommended
});
