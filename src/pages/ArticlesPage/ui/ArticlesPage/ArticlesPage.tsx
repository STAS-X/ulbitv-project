import { ArticleSchema, ArticleView } from 'entities/Article/model/types/articleSchema';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { FC, memo, useEffect, useCallback, useState, useRef, MutableRefObject } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { StateSchema, useAppDispatch } from 'app/providers/StoreProvider';
import { articlesPageReducer, getArticlesPage, articlesPageActions } from '../../model/slices/articlePageSlice';
import classes from './ArticlesPage.module.scss';
import {
	getArticlesPageHasMore,
	getArticlesPageInited,
	getArticlesPageIsLoading,
	getArticlesPageLimit,
	getArticlesPageScrollToArticleId,
	getArticlesPageTotal,
	getArticlesPageView
} from '../..';
import { ArticleViewSelector } from 'features/ArticleViewSelector/ArticleViewSelector';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { ARTICLE_ITEM_SELECTOR, DEBOUNCE_DELAY, DIV_SCROLL_SELECTOR } from 'shared/const/localstorage';
import { useDebounce as useScrollDebounce } from 'shared/lib/hooks/useDebounce';

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
	const total = useSelector(getArticlesPageTotal);
	const articles = useSelector<StateSchema, ArticleSchema[]>(getArticlesPage.selectAll);
	const limit = useSelector(getArticlesPageLimit);
	const scrollTo = useSelector(getArticlesPageScrollToArticleId);
	const inited = useSelector(getArticlesPageInited);
	const currentLimit = Math.min(limit, articles?.length > 0 && total > 0 ? total - articles.length : limit);

	//  const pageWrapper: MutableRefObject<HTMLDivElement | null> = useRef(
	//  	document.querySelector(DIV_SCROLL_SELECTOR)
	//  );

	// debounce scroll articles
	const [scrollArticleId, setScrollArticleId] = useState('');
	// onload status div wrapper-page element
	const [scrolledWrapper, setScrolledWrapper] = useState(false);

	// The goal is to only have the API call fire when user stops typing ...
	// ... so that we aren't hitting our API rapidly.
	const handleScrollToState = useCallback(
		(value: string | number) => {
			if (scrolledWrapper) {
				dispatch(articlesPageActions.setScrollToArticleId(String(value)));
				console.log(value, 'new articleId to scroll');
			}
		},
		[dispatch, scrolledWrapper]
	);
	useScrollDebounce(scrollArticleId, DEBOUNCE_DELAY, handleScrollToState);

	// Подгрузка новых статей после завершения скрола текущей ленты
	const onLoadNextArticlesPage = useCallback(async () => {
		if (_PROJECT_ !== 'storybook' && !isLoading && hasMore) await dispatch(fetchNextArticlesPage());
	}, [dispatch, isLoading, hasMore]);

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
				let articleIdToScroll = '';
				articles.forEach((article, index) => {
					if (article.getBoundingClientRect().bottom - 50 <= wrapperHeight) {
						//console.log(article.getBoundingClientRect().bottom, wrapperHeight, index, article.id, 'get article data');
						//console.log(`article ${index}  ${article.id} in viewport`);
						if (index > 0) articleIdToScroll = article.id;
					}
				});

				//console.log(`article new ${articleIdToScroll} old ${scrollArticleId}`);
				if (articleIdToScroll !== scrollArticleId) {
					console.log(`article new ${articleIdToScroll} old ${scrollArticleId}`);
					setScrollArticleId(articleIdToScroll);
				}
			}
		},
		[setScrollArticleId, scrollArticleId]
	);

	// Функция иницализации первичного скролла на статью с id - scrollTo после onmount
	const initScrollWrapper = (wrapperElement: HTMLDivElement | null) => {
		if (scrolledWrapper || !wrapperElement || !scrollTo) {
			if (!scrolledWrapper) setScrolledWrapper(true);
			return;
		}
		const nodeArray: HTMLDivElement[] = Array.from(wrapperElement.querySelectorAll(`${ARTICLE_ITEM_SELECTOR}`));

		if (nodeArray.length === 0) {
			setTimeout(() => initScrollWrapper(wrapperElement), DEBOUNCE_DELAY);
		} else {
			nodeArray.forEach((article) => {
				if (article.id === '3') {
					console.log(article.id, scrollTo, 'get article data');
					//wrapperElement.scrollTo({ top: article.getBoundingClientRect().top, behavior: 'smooth' });
					article.scrollIntoView({
						block: 'center',
						behavior: 'smooth'
					});
				}
			});
			setScrolledWrapper(true);
			console.log('scrolling loaded and finish');
		}
	};

	// Добавление функции слежения за скролом на div page-wrapper
	useEffect(() => {
		const pageWrapper: HTMLDivElement | null = document.querySelector(DIV_SCROLL_SELECTOR);

		initScrollWrapper(pageWrapper);
		pageWrapper?.addEventListener('scroll', handleScrollPage);

		return () => {
			pageWrapper?.removeEventListener('scroll', handleScrollPage);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Инициализация state.articlePages
	useEffect(() => {
		if (!inited) {
			dispatch(articlesPageActions.initState());
		}
	}, [dispatch, inited]);

	const handleChangeView = useCallback(
		(newView: ArticleView) => {
			dispatch(articlesPageActions.setView(newView));
		},
		[dispatch]
	);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
			<PageWrapper className={classNames(classes.articlespage, {}, [className])}>
				<div className={classes.header}>
					<ArticleViewSelector view={view} onViewClick={handleChangeView} />
				</div>
				<div className={classes.articlelist}>
					<ArticleList
						view={view}
						isLoading={isLoading}
						hasMore={hasMore}
						limit={currentLimit}
						articles={articles}
						onLoadNext={onLoadNextArticlesPage}
					/>
				</div>
			</PageWrapper>
		</DynamicModuleLoader>
	);
});

export default ArticlesPage;
