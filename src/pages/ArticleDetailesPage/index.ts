export { ArticleDetailesPageLazy as ArticleDetailesPage } from './ui/ArticleDetailesPage/ArticleDetailesPage.lazy';
export type { ArticleDetailesPageSchema } from './model/types';
export {
	getArticleComments,
	actionArticleComments,
	reducerArticleComments
} from './model/slice/articleDetailesCommentsSlice';
export {
	getArticleRecommended,
	articleDetailesRecommended,
	reducerDetailesRecommended
} from './model/slice/articleDetailesRecommendedSlice';
export { articleDetailesPageReducer } from './model/slice';
export { getArticleCommentsIsLoading, getArticleCommentsError, useArticleComments } from './model/selectors/getArticleCommentsData';
export {
	getArticleRecommendedIsLoading,
	getArticleRecommendedError
} from './model/selectors/getArticleRecommendedData';
export { fetchRecommendationsForArticle } from './model/services/fetchRecommendationsForArticle/fetchRecommendationsForArticle';
export { fetchCommentsByArticleId } from './model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
export { deleteArticleCommentById } from './model/services/deleteArticleCommentById/deleteArticleCommentById';
export { useGetRecommendationByArticleQuery } from '@/features/ArticleRecommendationsList/api/useArticleRecommendations';
