import { ArticleSchema } from 'entities/Article/model/types/articleSchema';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { FC, memo, useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { StateSchema, useAppDispatch } from 'app/providers/StoreProvider';
import {
	articlesPageReducer,
	articlesPageActions,
	getFiltredArticles,
	getArticlesPage
} from '../../model/slices/articlePageSlice';
import classes from './ArticlesPage.module.scss';
import {
	getArticlesPageHasMore,
	getArticlesPageInited,
	getArticlesPageIsLoading,
	getArticlesPageLimit,
	getArticlesPageScrollToArticleId,
	getArticlesPageTotal,
	getArticlesPageView,
	getArticlesPageFilter,
	getArticlesPageCategory
} from '../..';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { ARTICLE_ITEM_SELECTOR, DEBOUNCE_DELAY, DIV_SCROLL_SELECTOR } from 'shared/const/localstorage';
import { useDebounce as useScrollDebounce } from 'shared/lib/hooks/useDebounce';
import { ArticlesPageFilters } from 'entities/Article';
import { useArticlesParams } from 'shared/lib/hooks/useArticlesQueryParams';
import { useSearchParams } from 'react-router-dom';

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
	const filter = useSelector(getArticlesPageFilter);
	const category = useSelector(getArticlesPageCategory);
	const total = useSelector<StateSchema, number>(getArticlesPageTotal);
	const selectedTotal = useSelector<StateSchema, number>(getArticlesPage.selectTotal);
	const articles = useSelector<StateSchema, ArticleSchema[]>(getFiltredArticles); //(getArticlesPage.selectAll);
	const isFiltred = Boolean(selectedTotal !== articles.length);
	const limit = useSelector(getArticlesPageLimit);
	const scrollTo = useSelector(getArticlesPageScrollToArticleId);
	const inited = useSelector(getArticlesPageInited);
	const currentLimit = Math.min(limit, selectedTotal >= 0 && total > 0 ? total - selectedTotal : limit);

	const { queryParams } = useArticlesParams(Boolean(inited));
	//  const pageWrapper: MutableRefObject<HTMLDivElement | null> = useRef(
	//  	document.querySelector(DIV_SCROLL_SELECTOR)
	//  );

	// debounce scroll articles
	const [scrollArticleId, setScrollArticleId] = useState(scrollTo);
	// onload status div wrapper-page element
	const [scrolledWrapper, setScrolledWrapper] = useState(false);

	// The goal is to only have the API call fire when user stops typing ...
	// ... so that we aren't hitting our API rapidly.
	const handleScrollToState = useCallback(
		(value: string | number) => {
			console.log(scrolledWrapper, value, 'get scrolledWrapped');
			if (scrolledWrapper) {
				dispatch(articlesPageActions.setScrollToArticleId(Number(value)));
				//console.log(value, 'new articleId to scroll');
			}
		},
		[dispatch, scrolledWrapper]
	);
	useScrollDebounce(scrollArticleId, DEBOUNCE_DELAY, handleScrollToState);

	// Подгрузка новых статей после завершения скрола текущей ленты
	const onLoadNextArticlesPage = useCallback(async () => {
		if (_PROJECT_ !== 'storybook' && inited && !isLoading && !isFiltred && hasMore)
			await dispatch(fetchNextArticlesPage());
	}, [dispatch, isLoading, inited, hasMore, isFiltred]);

	// const fetchArticlesPage = useCallback(async () => {
	// 	if (page === 0 && hasMore) {
	// 		dispatch(articlesPageActions.initState());
	// 		await onLoadNextArticlesPage();
	// 	}
	// }, [dispatch, onLoadNextArticlesPage, hasMore, page]);

	// Сохранение текущего скрола страницы для хука useDebounce
	const handleScrollPage = useCallback(
		(event: Event) => {
			if (event.target) {
				const target = event.target as HTMLDivElement;
				const wrapperHeight = target.getBoundingClientRect().height;
				const articles = target.querySelectorAll(ARTICLE_ITEM_SELECTOR);
				let scrollBaseTop = 0;
				let newScrollArticleId = -1;
				articles.forEach((article: Element | HTMLElement, index) => {
					//console.log(newScrollArticleId, article.id, isLoading, scrollArticleId, 'get data scrolling');
					if (newScrollArticleId > -1) return;

					if (index === 0) scrollBaseTop = article.getBoundingClientRect().top;
					if (
						article.getBoundingClientRect().top - 60 >= 0 &&
						article.getBoundingClientRect().bottom - 60 <= wrapperHeight &&
						article.getBoundingClientRect().top > scrollBaseTop
					) {
						if (Number(article.id) !== scrollArticleId) {
							//console.log(`${article.getBoundingClientRect().top} ${article.getBoundingClientRect().bottom} ${index}`);
							//console.log(`article new ${index === 0 ? 0 : article.id} old ${scrollArticleId}`);
							newScrollArticleId = index === 0 ? 0 : Number(article.id);
							return;
						}
					}
				});
				//console.log(newScrollArticleId, isLoading, 'get data scrolling');
				if (newScrollArticleId > -1 && !isLoading) {
					//console.log(scrollArticleId, isLoading, 'get data SCROLLLLL');
					setScrollArticleId(newScrollArticleId);
				}
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setScrollArticleId, scrollArticleId, isLoading]
	);

	// Функция иницализации первичного скролла на статью после завершения onmount элемента статьи article
	const initScrollWrapper = useCallback(
		(article: HTMLDivElement, articleId: number) => {
			//console.log(`scrolling start ${String(scrolledWrapper)} - ${articleId} - ${scrollTo}`);
			if (!scrolledWrapper && articleId === scrollTo) {
				//console.log(`${articleId} - scrolling to article`);
				article.scrollIntoView({
					block: 'center',
					behavior: 'auto'
				});
				setScrolledWrapper(true);
			}
		},
		[scrolledWrapper, scrollTo]
	);

	// Добавление функции слежения за скролом на div page-wrapper
	useEffect(() => {
		const pageWrapper: HTMLDivElement | null = document.querySelector(DIV_SCROLL_SELECTOR);

		pageWrapper?.addEventListener('scroll', handleScrollPage);
		//console.log(pageWrapper, `scroll to TOP! ${scrollTo} ${String(isLoading)}`);
		if (scrollTo === 0 && !isLoading) {
			if (pageWrapper?.scrollTop && pageWrapper?.scrollTop > 0) pageWrapper.scrollTop = 0;
			setScrolledWrapper(true);
		}

		return () => {
			pageWrapper?.removeEventListener('scroll', handleScrollPage);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scrollTo, isLoading]);

	// Инициализация state.articlePages после загрузки query параметров
	useEffect(() => {
		if (!inited && queryParams) {
			//console.log(Object.keys(queryParams).length, 'query length');
			dispatch(articlesPageActions.initState(queryParams));
		}
	}, [dispatch, queryParams, inited]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
			{inited && <ArticlesPageFilters />}
			<PageWrapper className={classNames(classes.articlespage, {}, [className])}>
				<div className={classes.articlelist}>
					<ArticleList
						view={view}
						isLoading={isLoading}
						hasMore={hasMore}
						filter={filter}
						category={category}
						limit={currentLimit}
						articles={articles}
						onInitScroll={initScrollWrapper}
						onLoadNext={onLoadNextArticlesPage}
					/>
				</div>
			</PageWrapper>
		</DynamicModuleLoader>
	);
});

export default ArticlesPage;
