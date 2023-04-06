import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getArticleCommentsIsLoading = (state: StateSchema) => state.articleDetailesComments?.isLoading;
export const getArticleCommentsError = (state: StateSchema) => state.articleDetailesComments?.error;
