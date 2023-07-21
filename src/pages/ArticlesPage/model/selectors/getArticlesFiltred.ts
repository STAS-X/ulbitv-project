import { EntityId, createSelector } from '@reduxjs/toolkit';
import { getArticlesPage } from '../slices/articlePageSlice';
import { getArticlesPageCategory, getArticlesPageFilter } from './getArticlesPageData';
import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

// Селектор для фильтрации статей на клиенте - пока не используем
export const getFiltredArticles = createSelector(
	[getArticlesPage.selectAll, getArticlesPageCategory, getArticlesPageFilter],
	(articles, categoryBy = [], filterBy = '') => {
		try {
			const regex = new RegExp(filterBy);
			const categoryArticles =
				categoryBy.length > 0
					? articles.filter((article) => article.type.some((category) => categoryBy.includes(category)))
					: articles;
			return categoryArticles.filter((article) => regex.test(article.title));
		} catch (error) {
			return [];
		}
	}
);

// Строим селектор, возвращающий статью из стейта по ее ID на базе функции возвращающий селектор в виде хук а
export const [useArticleById] = buildSelector((state: StateSchema, articleId: EntityId) => getArticlesPage.selectById(state, articleId));