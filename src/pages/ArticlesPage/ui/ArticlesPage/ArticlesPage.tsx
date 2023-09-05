import { FC, memo, useEffect, ReactNode, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/app/providers/StoreProvider';
import { articlesPageReducer, articlesPageActions } from '../../model/slices/articlePageSlice';
import classes from './ArticlesPage.module.scss';
import { /*useArticleById,*/ getArticlesPageInited } from '../../model/selectors/getArticlesPageData';
import { PageWrapper } from '@/shared/ui/deprecated/PageWrapper/PageWrapper';
import { ArticlesPageFilters, ArticleInfiniteGridLoader } from '@/entities/Article';
import { useArticlesParams } from '@/shared/lib/hooks/useArticlesQueryParams';
import { saveJSONSettingsByUser, getUserData, useSettingsByKey } from '@/entities/User';
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';
import { ContentLayout } from '@/shared/layout';
import { useArticleFilter } from '@/shared/lib/hooks/useArticleFilter';
import { ArticleViewSelector } from '@/features/ArticleSelectors';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';

export interface ArticlesPageProps {
	className?: string;
	children?: ReactNode;
}

const reducers: ReducerList = {
	articlesPage: articlesPageReducer
};

const ArticlesPage: FC<ArticlesPageProps> = memo((props: ArticlesPageProps) => {
	const { className } = props;

	const dispatch = useAppDispatch();
	const inited = useSelector(getArticlesPageInited) || false;
	const { username } = useSelector(getUserData) ?? {};
	//const currentLimit = Math.min(limit, selectedTotal >= 0 && total > 0 ? total - selectedTotal : limit);
	//const articleFromSelector = useArticleById(5);
	const { queryParams } = useArticlesParams();
	//const [isFirstVisit, setIsFirstVisit]  = useState();
	const isFirstVisit = useSettingsByKey('isFirstVisit') as boolean;

	const { view, handleChangeView, renderProgress } = useArticleFilter();

	//console.log(isFirstVisit, typeof isFirstVisit, 'get FirstVisit param');
	//const isRedesign = className === classes.articlepageredesign;
	//const isFirstVisit = dispatch(getJSONSettingByKey('isFirstVisit')).then((res: any) => console.log(res, 'PROMISE'));
	//console.log(isFirstVisit, 'get first visit data');

	const removeFirstVisit = useCallback(() => {
		(async () => {
			await dispatch(saveJSONSettingsByUser({ isFirstVisit: false }));
		})();
	}, [dispatch]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	// useEffect(() => {
	// 	setReloading(false);
	// });

	// debounce scroll articles
	//const [scrollArticleId, setScrollArticleId] = useState(scrollTo);
	// onload status div wrapper-page element
	//const [scrolledWrapper, setScrolledWrapper] = useState(false);

	// The goal is to only have the API call fire when user stops typing ...
	// ... so that we aren't hitting our API rapidly.
	// const handleScrollToState = useCallback(
	// 	(value: string | number) => {
	// 		console.log(scrolledWrapper, value, 'get scrolledWrapped');
	// 		if (scrolledWrapper) {
	// 			dispatch(articlesPageActions.setScrollToArticleId(Number(value)));
	// 			//console.log(value, 'new articleId to scroll');
	// 		}
	// 	},
	// 	[dispatch, scrolledWrapper]
	// );
	// useScrollDebounce(scrollArticleId, DEBOUNCE_DELAY, handleScrollToState);

	// const fetchArticlesPage = useCallback(async () => {
	// 	if (page === 0 && hasMore) {
	// 		dispatch(articlesPageActions.initState());
	// 		await onLoadNextArticlesPage();
	// 	}
	// }, [dispatch, onLoadNextArticlesPage, hasMore, page]);

	// Сохранение текущего скрола страницы для хука useDebounce
	// const handleScrollPage = useCallback(
	// 	(event: Event) => {
	// 		if (event.target) {
	// 			const target = event.target as HTMLDivElement;
	// 			const wrapperHeight = target.getBoundingClientRect().height;
	// 			const articles = target.querySelectorAll(ARTICLE_ITEM_SELECTOR);
	// 			let scrollBaseTop = 0;
	// 			let newScrollArticleId = -1;
	// 			articles.forEach((article: Element | HTMLElement, index) => {
	// 				//console.log(newScrollArticleId, article.id, isLoading, scrollArticleId, 'get data scrolling');
	// 				if (newScrollArticleId > -1) return;

	// 				if (index === 0) scrollBaseTop = article.getBoundingClientRect().top;
	// 				if (
	// 					article.getBoundingClientRect().top - 60 >= 0 &&
	// 					article.getBoundingClientRect().bottom - 60 <= wrapperHeight &&
	// 					article.getBoundingClientRect().top > scrollBaseTop
	// 				) {
	// 					if (Number(article.id) !== scrollArticleId) {
	// 						//console.log(`${article.getBoundingClientRect().top} ${article.getBoundingClientRect().bottom} ${index}`);
	// 						//console.log(`article new ${index === 0 ? 0 : article.id} old ${scrollArticleId}`);
	// 						newScrollArticleId = index === 0 ? 0 : Number(article.id);
	// 						return;
	// 					}
	// 				}
	// 			});
	// 			//console.log(newScrollArticleId, isLoading, 'get data scrolling');
	// 			if (newScrollArticleId > -1 && !isLoading) {
	// 				//console.log(scrollArticleId, isLoading, 'get data SCROLLLLL');
	// 				setScrollArticleId(newScrollArticleId);
	// 			}
	// 		}
	// 	},
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// 	[setScrollArticleId, scrollArticleId, isLoading]
	// );

	// Функция иницализации первичного скролла на статью после завершения onmount элемента статьи article
	// const initScrollWrapper = useCallback(
	// 	(article: HTMLDivElement, articleId: number) => {
	// 		//console.log(`scrolling start ${String(scrolledWrapper)} - ${articleId} - ${scrollTo}`);
	// 		if (!scrolledWrapper && articleId === scrollTo) {
	// 			//console.log(`${articleId} - scrolling to article`);
	// 			article.scrollIntoView({
	// 				block: 'center',
	// 				behavior: 'auto'
	// 			});
	// 			setScrolledWrapper(true);
	// 		}
	// 	},
	// 	[scrolledWrapper, scrollTo]
	// );
	// Инициализация state.articlePages после загрузки query параметров
	useEffect(() => {
		const initWithFetch = () => {
			if (!inited && queryParams) {
				//console.log(queryParams, 'query params');
				dispatch(articlesPageActions.initState(queryParams));
				//await dispatch(fetchNextArticlesPage());
			}
		};
		void initWithFetch();
	}, [dispatch, queryParams, inited]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
			<ToggleFeatures
				feature={'isAppRedesigned'}
				off={
					<PageWrapper
						data-testid={'ArticlesPage'}
						className={classNames(classes.articlespage, {}, [className])}
					>
						<div className={classes.container}>
							{inited && <ArticlesPageFilters />}
							<div data-testid={'ArticleList'} className={classes.articlelist}>
								{inited && <ArticleInfiniteGridLoader />}
								{/* <ArticleList
						view={view}
						isLoading={isLoading}
						hasMore={hasMore}
						filter={filter}
						category={category}
						target={target}
						limit={limit}
						articles={articles}
						onInitScroll={initScrollWrapper}
						onLoadNext={onLoadNextArticlesPage}
					/> */}
							</div>
						</div>
						{isFirstVisit && (
							<ArticlePageGreeting
								isModalOpen={isFirstVisit}
								userName={username}
								onClose={removeFirstVisit}
							/>
						)}
					</PageWrapper>
				}
				on={
					<ContentLayout
						dataTestId={'ArticlesPage'}
						className={classNames(classes.articlespage, {}, [className])}
						left={
							<div className={classes.headerviews}>
								<ArticleViewSelector view={view} onViewClick={handleChangeView} />
							</div>
						}
						right={<ArticlesFilters />}
						content={
							<div data-testid={'ArticleList'} className={classes.articlelistredesign}>
								{renderProgress(classes.inprogress)}
								{inited && <ArticleInfiniteGridLoader />}
							</div>
						}
					/>
				}
			/>
		</DynamicModuleLoader>
	);
});

// const ArticlesPage: FC<ArticlesPageProps> = (props: ArticlesPageProps) => {
// 	return (
// 		<ToggleFeatures
// 			feature={'isAppRedesigned'}
// 			off={<ArticlesPageComponent {...props} />}
// 			on={<ArticlesPageComponent {...props} className={classes.articlepageredesign} />}
// 		/>
// 	);
// };

export default ArticlesPage;
