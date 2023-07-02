import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleCommentsIsLoading = (state: StateSchema) => state.articleDetailesPage?.comments?.isLoading;
export const getArticleCommentsError = (state: StateSchema) => state.articleDetailesPage?.comments?.error;
