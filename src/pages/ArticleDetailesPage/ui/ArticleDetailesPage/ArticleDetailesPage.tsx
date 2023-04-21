import { FC, memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetailes } from 'entities/Article';
import { CommentList, CommentSchema } from 'entities/Comment';
import { Text } from 'shared/ui/Text/Text';
import classes from './ArticleDetailesPage.module.scss';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getArticleComments, reducerArticleComments } from '../../model/slice/articleDetailesCommentsSlice';
import { useSelector } from 'react-redux';
import { getArticleCommentsIsLoading } from '../../model/selectors/getArticleCommentsData';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import AddCommentForm from 'features/AddCommentForm/ui/AddCommentForm/AddCommentForm';
import { useFetchCommentForArticle } from '../../model/services/fetchCommentForArticle/fetchCommentForArticle';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { AppRoutes } from 'shared/config/routeConfig/routeConfig';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';

export interface ArticleDetailesPageProps {
	className?: string;
}

const redusers: ReducerList = {
	articleDetailesComments: reducerArticleComments
};

const ArticleDetailesPage: FC<ArticleDetailesPageProps> = memo((props: ArticleDetailesPageProps) => {
	const { className } = props;
	const { id: articleId } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const comments = useSelector<StateSchema, CommentSchema[]>(getArticleComments.selectAll);
	const isLoading = useSelector(getArticleCommentsIsLoading);
	const sendCommentForArticle = useFetchCommentForArticle();
	const dispatch = useAppDispatch();

	const navigateToList = useCallback(() => {
		navigate(`/${AppRoutes.ARTICLES}`);
	}, [navigate]);

	const { t } = useTranslation(['comments', 'articles']);

	useEffect(() => {
		const fetchCommentByArticle = async () => {
			if (_PROJECT_ !== 'storybook') await dispatch(fetchCommentsByArticleId({ articleId }));
		};
		void fetchCommentByArticle();
	}, [dispatch, articleId]);

	return (
		<DynamicModuleLoader reducers={redusers} removeAfterUnmount>
			<PageWrapper className={classNames(classes.articledetailespage, {}, [className])}>
				<Button theme={ButtonTheme.OUTLINE} onClick={navigateToList}>
					{t('backToList', { ns: 'articles' })}
				</Button>
				<ArticleDetailes articleId={articleId} />
				<Text className={classes.commentTitle} title={t('commentForm')} />
				<AddCommentForm onSendComment={sendCommentForArticle} />
				<CommentList isLoading={isLoading} comments={comments} />
			</PageWrapper>
		</DynamicModuleLoader>
	);
});

export default ArticleDetailesPage;
