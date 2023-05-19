export { ArticleDetailesPageLazy as ArticleDetailesPage } from './ui/ArticleDetailesPage/ArticleDetailesPage.lazy';
export { ArticleDetailesPageHeader } from './ui/ArticleDetailesPageHeader/ArticleDetailesPageHeader';
export { ArticleDetailesPageSchema } from './model/types';
export { ArticleDetailesCommentsSchema } from './model/types/ArticleDetailesCommentsSchema';
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
export { getArticleCommentsIsLoading, getArticleCommentsError } from './model/selectors/getArticleCommentsData';
export {
	getArticleRecommendedIsLoading,
	getArticleRecommendedError
} from './model/selectors/getArticleRecommendedData';
export { fetchRecommendationsForArticle } from './model/services/fetchRecommendationsForArticle/fetchRecommendationsForArticle';
export { fetchCommentsByArticleId } from './model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
export { useGetRecommendationByArticleQuery } from '../../features/ArticleRecommendationsList/api/useArticleRecommendations';
