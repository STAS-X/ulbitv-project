import { getArticleData } from 'entities/Article/model/selectors/getArticleData';
import { getUserData } from 'entities/User';
import { createSelector } from '@reduxjs/toolkit';

export const getUserCanEditArticle = createSelector([getUserData, getArticleData], (user, currentArticle) => {
	if (!user || !currentArticle) return false;
	return currentArticle?.user?.id === user?.id;
});
