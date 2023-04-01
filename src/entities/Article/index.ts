export { ArticleSchema } from './model/types/articleSchema';
export { ArticleDetailesSchema } from './model/types/articleDetailesSchema';
export { getArticleData, getArticleError, getArticleIsLoading } from './model/selectors/getArticleData';
export { articleDetailsActions, articleDetailsReducer } from './model/slices/articleSlice';
export { ArticleDetailesPageLazy as ArticleDetailesPage } from './ui/ArticleDetailesPage/ArticleDetailesPage.lazy';
