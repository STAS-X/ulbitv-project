import { FC, memo, ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetailes } from 'entities/Article';
import classes from './ArticleDetailesPage.module.scss';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ArticleDetailesPageHeader } from '../..';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';
import { fetchRecommendationsForArticle } from '../../model/services/fetchRecommendationsForArticle/fetchRecommendationsForArticle';
import { articleDetailesPageReducer } from './../../model/slice';
import { useLocation } from 'app/providers/RouterUtilsProvider/RouterUtilsProvider';
import { OptionalRecord } from 'shared/lib/url/queryParams/addQueryParams';
import { VStack } from 'shared/ui/Stack';
import { ArticleRecommendationsList } from 'features/ArticleRecommendationsList';
import { ArticleDetailesComments } from '../ArticleDetailesComments/ArticleDetailesComments';

export interface ArticleDetailesPageProps {
	className?: string;
	children?: ReactNode;
}

const redusers: ReducerList = {
	articleDetailesPage: articleDetailesPageReducer
};

const ArticleDetailesPage: FC<ArticleDetailesPageProps> = memo((props: ArticleDetailesPageProps) => {
	const { className } = props;
	const location = useLocation();
	const { id: articleId = '' } = useParams<{ id: string }>();

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
				<VStack gap={16}>
					<ArticleDetailesPageHeader />
					<ArticleDetailes articleId={articleId} />
					<ArticleRecommendationsList />
					<ArticleDetailesComments id={articleId} />
				</VStack>
			</PageWrapper>
		</DynamicModuleLoader>
	);
});

export default ArticleDetailesPage;
