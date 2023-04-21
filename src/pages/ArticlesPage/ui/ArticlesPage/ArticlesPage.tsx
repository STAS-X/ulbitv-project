import { ArticleSchema } from 'entities/Article/model/types/articleSchema';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { FC, memo, useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { StateSchema, useAppDispatch } from 'app/providers/StoreProvider';
import { articlesPageReducer, articlesPageActions, getFiltredArticles } from '../../model/slices/articlePageSlice';
import classes from './ArticlesPage.module.scss';
import {
	getArticlesPageHasMore,
	getArticlesPageInited,
	getArticlesPageIsLoading,
	getArticlesPageLimit,
	getArticlesPageScrollToArticleId,
	getArticlesPageTotal,
	getArticlesPageView,
	getArticlesPageFilter
} from '../..';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { ARTICLE_ITEM_SELECTOR, DEBOUNCE_DELAY, DIV_SCROLL_SELECTOR } from 'shared/const/localstorage';
import { useDebounce as useScrollDebounce } from 'shared/lib/hooks/useDebounce';
import { ArticlesPageFilters } from 'entities/Article';

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
	const total = useSelector(getArticlesPageTotal);
	const articles = useSelector<StateSchema, ArticleSchema[]>(getFiltredArticles); //(getArticlesPage.selectAll);
	const limit = useSelector(getArticlesPageLimit);
	const scrollTo = useSelector(getArticlesPageScrollToArticleId);
	const inited = useSelector(getArticlesPageInited);
	const currentLimit = Math.min(limit, articles?.length > 0 && total > 0 ? total - articles.length : limit);

	//  const pageWrapper: MutableRefObject<HTMLDivElement | null> = useRef(
	//  	document.querySelector(DIV_SCROLL_SELECTOR)
	//  );

	// debounce scroll articles
	const [scrollArticleId, setScrollArticleId] = useState(0);
	// onload status div wrapper-page element
	const [scrolledWrapper, setScrolledWrapper] = useState(false);

	// The goal is to only have the API call fire when user stops typing ...
	// ... so that we aren't hitting our API rapidly.
	const handleScrollToState = useCallback(
		(value: string | number) => {
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
		if (_PROJECT_ !== 'storybook' && !isLoading && !filter && hasMore) await dispatch(fetchNextArticlesPage());
	}, [dispatch, isLoading, hasMore, filter]);

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
					if (newScrollArticleId > -1) return;
					if (index === 0) scrollBaseTop = article.getBoundingClientRect().top;
					if (
						article.getBoundingClientRect().top - 50 >= 0 &&
						article.getBoundingClientRect().bottom - 50 <= wrapperHeight &&
						article.getBoundingClientRect().top >= scrollBaseTop
					) {
						if (Number(article.id) !== scrollArticleId) {
							//console.log(`${article.getBoundingClientRect().top} ${article.getBoundingClientRect().bottom} ${index}`);
							//console.log(`article new ${index === 0 ? 0 : article.id} old ${scrollArticleId}`);
							newScrollArticleId = index === 0 ? 0 : Number(article.id);
							return;
						}
					}
				});
				if (newScrollArticleId > -1 && !isLoading) setScrollArticleId(newScrollArticleId);
			}
		},
		[setScrollArticleId, scrollArticleId, isLoading]
	);

	// Функция иницализации первичного скролла на статью после завершения onmount элемента статьи article
	const initScrollWrapper = useCallback(
		(article: HTMLDivElement, articleId: number) => {
			if (!scrolledWrapper && articleId === scrollTo) {
				setTimeout(() => {
					article.scrollIntoView({
						block: 'center',
						behavior: 'smooth'
					});
					setScrolledWrapper(true);
				}, DEBOUNCE_DELAY);
				console.log('scrolling loaded and finish');
			}
		},
		[scrolledWrapper, scrollTo]
	);

	// Добавление функции слежения за скролом на div page-wrapper
	useEffect(() => {
		const pageWrapper: HTMLDivElement | null = document.querySelector(DIV_SCROLL_SELECTOR);

		pageWrapper?.addEventListener('scroll', handleScrollPage);
		if (scrollTo === 0) {
			if (pageWrapper?.scrollTop) pageWrapper.scrollTop = 0;
			setScrolledWrapper(true);
		}

		return () => {
			pageWrapper?.removeEventListener('scroll', handleScrollPage);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scrollTo]);

	// Инициализация state.articlePages
	useEffect(() => {
		if (!inited) {
			dispatch(articlesPageActions.initState());
		}
	}, [dispatch, inited]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
			<ArticlesPageFilters />
			<PageWrapper className={classNames(classes.articlespage, {}, [className])}>
				<div className={classes.articlelist}>
					<ArticleList
						view={view}
						isLoading={isLoading}
						hasMore={hasMore}
						filter={filter}
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
