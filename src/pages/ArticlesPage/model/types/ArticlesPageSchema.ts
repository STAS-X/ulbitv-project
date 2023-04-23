import { EntityState } from '@reduxjs/toolkit';
import { ArticleView, ArticleSchema } from 'entities/Article/model/types/articleSchema';
import { SortOrder, SortFields } from 'shared/lib/filters/sortTypes';

export interface ArticlesPageSchema extends EntityState<ArticleSchema> {
	isLoading?: boolean;
	error?: string;
	view: ArticleView;
	_inited: boolean;
	// for pagination
	page?: number;
	limit?: number;
	total?: number;
	// for scrolling
	scrollTo?: number;
	hasMore?: boolean;
	// filters
	sortOrder: SortOrder;
	sortField: SortFields;
	searchFilter: string;
	isFiltered?: boolean;
	inProcessed?: boolean;
}

export type ArticlesSort = { field: SortFields; order: SortOrder };
export type ArticlesSearch = string;
