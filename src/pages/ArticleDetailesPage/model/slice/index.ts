import { ArticleDetailesPageSchema } from './../types/index';
import { reducerDetailesRecommended, reducerArticleComments } from 'pages/ArticleDetailesPage';
import { combineReducers } from '@reduxjs/toolkit';

export const articleDetailesPageReducer = combineReducers<ArticleDetailesPageSchema>({
	comments: reducerArticleComments,
	recommendations: reducerDetailesRecommended
});
