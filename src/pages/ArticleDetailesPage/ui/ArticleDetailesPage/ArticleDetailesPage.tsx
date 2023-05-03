import { FC, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetailes, ArticleSchema, ArticleView, getArticleData } from 'entities/Article';
import { CommentList, CommentSchema } from 'entities/Comment';
import { Text, TextSize } from 'shared/ui/Text/Text';
import classes from './ArticleDetailesPage.module.scss';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
	ArticleDetailesPageHeader,
	getArticleComments,
	getArticleRecommended,
	getArticleRecommendedIsLoading
} from '../..';
import { useSelector } from 'react-redux';
import { getArticleCommentsIsLoading } from '../../model/selectors/getArticleCommentsData';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import AddCommentForm from 'features/AddCommentForm/ui/AddCommentForm/AddCommentForm';
import { useFetchCommentForArticle } from '../../model/services/fetchCommentForArticle/fetchCommentForArticle';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { fetchRecommendationsForArticle } from 'pages/ArticleDetailesPage/model/services/fetchRecommendationsForArticle/fetchRecommendationsForArticle';
import { articleDetailesPageReducer } from './../../model/slice';
import { useLocation } from 'app/providers/RouterUtilsProvider/RouterUtilsProvider';
import { OptionalRecord } from 'shared/lib/url/queryParams/addQueryParams';

export interface ArticleDetailesPageProps {
	className?: string;
}

const redusers: ReducerList = {
	articleDetailesPage: articleDetailesPageReducer
};

const ArticleDetailesPage: FC<ArticleDetailesPageProps> = memo((props: ArticleDetailesPageProps) => {
	const { className } = props;
	const { id: articleId = '' } = useParams<{ id: string }>();
	const location = useLocation();

	const comments = useSelector<StateSchema, CommentSchema[]>(getArticleComments.selectAll);
	const recomendations = useSelector<StateSchema, ArticleSchema[]>(getArticleRecommended.selectAll);
	const isLoading = useSelector(getArticleCommentsIsLoading);

	const recomendaionsIsLoading = useSelector(getArticleRecommendedIsLoading);
	const sendCommentForArticle = useFetchCommentForArticle();
	const dispatch = useAppDispatch();

	useEffect(() => {
		// При первичном рендере компонента в случае необходимост перебрасываем на новую вкладку
		const state = location.state as OptionalRecord;
		const { search, pathname } = location;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (state?.target) {
			window.open(`${pathname}${search ? '?' + search : ''}`, state.target);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { t } = useTranslation(['comments', 'articles']);

	useEffect(() => {
		const fetchCommentByArticle = async () => {
			if (_PROJECT_ !== 'storybook') {
				await dispatch(fetchRecommendationsForArticle({ articleId }));
				await dispatch(fetchCommentsByArticleId({ articleId }));
			}
		};
		void fetchCommentByArticle();
	}, [dispatch, articleId]);

	return (
		<DynamicModuleLoader reducers={redusers} removeAfterUnmount>
			<PageWrapper className={classNames(classes.articledetailespage, {}, [className])}>
				<ArticleDetailesPageHeader />
				<ArticleDetailes articleId={articleId} />
				<Text size={TextSize.L} className={classes.title} title={t('recommendedForm', { ns: 'articles' })} />
				{recomendations.length > 0 && (
					<ArticleList
						className={classes.recommendation}
						articles={recomendations}
						isLoading={recomendaionsIsLoading}
						view={ArticleView.TILE}
						hasMore={false}
					/>
				)}
				<Text className={classes.title} title={t('commentForm')} />
				<AddCommentForm onSendComment={sendCommentForArticle} />
				<CommentList isLoading={isLoading} comments={comments} />
			</PageWrapper>
		</DynamicModuleLoader>
	);
});

export default ArticleDetailesPage;
