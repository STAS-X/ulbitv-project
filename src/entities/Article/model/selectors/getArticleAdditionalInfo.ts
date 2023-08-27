import { getArticleData } from './getArticleData';
import { createSelector } from '@reduxjs/toolkit';

export const getArticleAdditinalInfo = createSelector([getArticleData], (currentArticle) => {
	if (!currentArticle || !currentArticle.user) return null;
	return {
		author: currentArticle.user,
		articleId: currentArticle.id,
		createdAt: currentArticle.createdAt,
		views: currentArticle.views
	};
});
