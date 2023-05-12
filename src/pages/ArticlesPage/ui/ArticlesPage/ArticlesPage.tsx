import { ArticleSchema } from 'entities/Article/model/types/articleSchema';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { FC, memo, useEffect, useCallback, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { StateSchema, useAppDispatch } from 'app/providers/StoreProvider';
import { articlesPageReducer, articlesPageActions, getArticlesPage } from '../../model/slices/articlePageSlice';
import classes from './ArticlesPage.module.scss';
import {
	getArticlesPageHasMore,
	getArticlesPageInited,
	getArticlesPageIsLoading,
	getArticlesPageLimit,
	getArticlesPageView,
	getArticlesPageFilter,
	getArticlesPageCategory,
	getArticlesPageSortField,
	getArticlesPageSortOrder,
	getArticlesPageTarget
} from '../..';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { ArticlesPageFilters } from 'entities/Article';
import { useArticlesParams } from 'shared/lib/hooks/useArticlesQueryParams';
import { ArticleInfiniteLoader } from 'entities/Article/ui/ArticleInfiniteLoader/ArticleInfiniteLoader';
import { ArticleInfiniteGridLoader } from 'entities/Article/ui/ArticleInfiniteLoader/ArticleInfiniteGridLoader';
import { Text, TextSize } from '../../../../shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';

export interface ArticlesPageProps {
	className?: string;
}

const reducers: ReducerList = {
	articlesPage: articlesPageReducer
};

const ArticlesPage: FC<ArticlesPageProps> = memo((props: ArticlesPageProps) => {
	const { className } = props;

	const dispatch = useAppDispatch();
	const isLoading = useSelector(getArticlesPageIsLoading);
	const hasMore = useSelector(getArticlesPageHasMore);
	const view = useSelector(getArticlesPageView);
	const articles = useSelector<StateSchema, ArticleSchema[]>(getArticlesPage.selectAll);
	const limit = useSelector(getArticlesPageLimit);
	const filter = useSelector(getArticlesPageFilter);
	const category = useSelector(getArticlesPageCategory);
	const inited = useSelector(getArticlesPageInited) || false;
	//const currentLimit = Math.min(limit, selectedTotal >= 0 && total > 0 ? total - selectedTotal : limit);

	const { t } = useTranslation(['articles']);
	const { queryParams } = useArticlesParams();

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

	// Подгрузка новых статей после завершения скрола текущей ленты
	const onLoadNextArticlesPage = useCallback(async () => {
		//console.log(inited, isLoading, hasMore, 'get data from store');
		if (_PROJECT_ !== 'storybook' && inited && !isLoading && hasMore) await dispatch(fetchNextArticlesPage());
	}, [dispatch, isLoading, inited, hasMore]);

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
	const hasFilter = !!filter || category.length > 0;
	let messageElement: JSX.Element | null = null;

	if (!hasMore && !hasFilter) {
		messageElement = <Text size={TextSize.L} content={t('noArticles')} />;
	} else {
		messageElement =
			hasMore || isLoading ? null : (
				<Text
					size={TextSize.L}
					content={t('noFiltredArticles', {
						filter,
						category: Array.isArray(category) ? category.join(', ') : 'ALL'
					})}
				/>
			);
	}

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
			{inited && <ArticlesPageFilters />}
			<PageWrapper className={classNames(classes.articlespage, {}, [className])}>
				<div className={classes.articlelist}>
					{inited && (
						<ArticleInfiniteGridLoader
							view={view}
							hasNextPage={hasMore}
							isNextPageLoading={isLoading}
							items={articles}
							limit={limit}
							emptyPlaceholder={messageElement}
							fetchMore={onLoadNextArticlesPage}
						/>
					)}
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
			</PageWrapper>
		</DynamicModuleLoader>
	);
});

export default ArticlesPage;
