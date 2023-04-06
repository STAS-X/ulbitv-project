export { ArticleDetailesPageLazy as ArticleDetailesPage } from './ui/ArticleDetailesPage/ArticleDetailesPage.lazy';
export { ArticleDetailesCommentsSchema } from './model/types/ArticleDetailesCommentsSchema';
export {
	getArticleComments,
	actionArticleComments,
	reducerArticleComments
} from './model/slice/articleDetailesCommentsSlice';
export { getArticleCommentsIsLoading, getArticleCommentsError } from './model/selectors/getArticleCommentsData';
