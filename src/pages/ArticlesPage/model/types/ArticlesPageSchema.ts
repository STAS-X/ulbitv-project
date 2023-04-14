import { EntityState } from '@reduxjs/toolkit';
import { ArticleView, ArticleSchema } from 'entities/Article/model/types/articleSchema';

export interface ArticlesPageSchema extends EntityState<ArticleSchema> {
	isLoading?: boolean;
	error?: string;
	view: ArticleView;
	// for pagination
	page?: number;
	limit?: number;
	total?: number;
	hasMore?: boolean;
}