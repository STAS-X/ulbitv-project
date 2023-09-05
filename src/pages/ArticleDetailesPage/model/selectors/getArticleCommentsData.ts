import { getArticleComments } from './../slice/articleDetailesCommentsSlice';
import { buildSelector } from '@/shared/lib/store';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleCommentsIsLoading = (state: StateSchema) => state.articleDetailesPage?.comments?.isLoading;
export const getArticleCommentsError = (state: StateSchema) => state.articleDetailesPage?.comments?.error;

// Возвращаем мемизированный список комментариев к статье
export const [useArticleComments] = buildSelector((state: StateSchema) => getArticleComments.selectAll(state));