export { ArticleDetailesPageLazy as ArticleDetailesPage } from './ui/ArticleDetailesPage/ArticleDetailesPage.lazy';
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
