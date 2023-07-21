// eslint-disable-next-line stas-eslint-plugin/import-public-api
import { ArticleView } from '@/shared/lib/filters/sortTypes';
import { StateSchema } from '@/app/providers/StoreProvider';
import { EntityId } from '@reduxjs/toolkit';

export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading ?? false;
export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error;
export const getArticlesPageView = (state: StateSchema) => state.articlesPage?.view ?? ArticleView.LIST;
export const getArticlesPageNumber = (state: StateSchema) => state.articlesPage?.page ?? 0;
export const getArticlesPageTotal = (state: StateSchema) => state.articlesPage?.total ?? 0;
export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit ?? 1;
export const getArticlesPageScrollToArticleId = (state: StateSchema) => state.articlesPage?.scrollTo ?? 0;
export const getArticlesPageSortField = (state: StateSchema) => state.articlesPage?.sortField ?? 'title';
export const getArticlesPageSortOrder = (state: StateSchema) => state.articlesPage?.sortOrder ?? 'asc';
export const getArticlesPageFilter = (state: StateSchema) => state.articlesPage?.searchFilter ?? '';
export const getArticlesPageCategory = (state: StateSchema) => state.articlesPage?.categoryFilter ?? [];
export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore ?? true;
export const getArticlesPageInited = (state: StateSchema) => state.articlesPage?._inited;
export const getArticlesPageTarget = (state: StateSchema) => state.articlesPage?._target;
