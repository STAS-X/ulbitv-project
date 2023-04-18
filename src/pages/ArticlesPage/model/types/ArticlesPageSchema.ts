import { EntityState } from '@reduxjs/toolkit';
import { ArticleView, ArticleSchema } from 'entities/Article/model/types/articleSchema';

export interface ArticlesPageSchema extends EntityState<ArticleSchema> {
	isLoading?: boolean;
	error?: string;
	view: ArticleView;
	_inited: boolean;
	// for pagination
	page?: number;
	limit?: number;
	total?: number;
	scrollTo?: number;
	hasMore?: boolean;
}
