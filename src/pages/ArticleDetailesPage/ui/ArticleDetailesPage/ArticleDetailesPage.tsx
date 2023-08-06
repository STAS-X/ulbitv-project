import { FC, memo, ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleDetailes } from '@/entities/Article';
import classes from './ArticleDetailesPage.module.scss';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ArticleDetailesPageHeader } from '../ArticleDetailesPageHeader/ArticleDetailesPageHeader';
import { useAppDispatch } from '@/app/providers/StoreProvider';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { PageWrapper } from '@/shared/ui/deprecated/PageWrapper/PageWrapper';
import { fetchRecommendationsForArticle } from '../../model/services/fetchRecommendationsForArticle/fetchRecommendationsForArticle';
import { articleDetailesPageReducer } from './../../model/slice';
import { useLocation } from '@/shared/lib/hooks/useRouterUtils';
import { OptionalRecord } from '@/shared/lib/url/queryParams/addQueryParams';
import { VStack } from '@/shared/ui/redesign/Stack';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { ArticleDetailesComments } from '../ArticleDetailesComments/ArticleDetailesComments';
import { AddArticleRating } from '@/features/AddArticleRating';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';
import { Card } from '@/shared/ui/deprecated/Card/Card';

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

	//const isFeatureRecommendation: boolean = getFeatureFlag('isFeatureRecommendation');
	//const isFeatureRating: boolean = getFeatureFlag('isFeatureRating');
	//const isFeatureCounter: boolean = getFeatureFlag('isFeatureCounter');

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
			<PageWrapper
				data-testid={'ArticleDetailesPage'}
				className={classNames(classes.articledetailespage, {}, [className])}
			>
				<VStack gap={16}>
					<ArticleDetailesPageHeader />
					<ArticleDetailes articleId={articleId} />
					{/* Feature flag для фичи рейтинг статьи */}
					<ToggleFeatures
						feature={'isFeatureRating'}
						on={<AddArticleRating articleId={articleId} />}
						off={
							<Card>
								<span>Фича ArticleRating пока недлоступна для Вас</span>
							</Card>
						}
					/>
					{/* Feature flag для фичи рекомендации для статьи */}
					<ArticleRecommendationsList />
					<ArticleDetailesComments id={articleId} />
				</VStack>
			</PageWrapper>
		</DynamicModuleLoader>
	);
});

export default ArticleDetailesPage;
