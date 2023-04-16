import { ArticleView } from 'entities/Article/model/types/articleSchema';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading ?? false;
export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error;
export const getArticlesPageView = (state: StateSchema) => state.articlesPage?.view ?? ArticleView.LIST;
export const getArticlesPageNumber = (state: StateSchema) => state.articlesPage?.page ?? 0;
export const getArticlesPageTotal = (state: StateSchema) => state.articlesPage?.total ?? 0;
export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit ?? 1;
export const getArticlesPageScrollToArticleId = (state: StateSchema) => state.articlesPage?.scrollTo ?? '';
export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore ?? true;
export const getArticlesPageInited = (state: StateSchema) => state.articlesPage?._inited;
