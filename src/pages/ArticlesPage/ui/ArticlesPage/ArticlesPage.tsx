import { FC, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { articlesPageReducer, articlesPageActions } from '../../model/slices/articlePageSlice';
import classes from './ArticlesPage.module.scss';
import { getArticlesPageInited } from '../..';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';
import { ArticlesPageFilters } from 'entities/Article';
import { useArticlesParams } from 'shared/lib/hooks/useArticlesQueryParams';
import { ArticleInfiniteGridLoader } from 'entities/Article/ui/ArticleInfiniteLoader/ArticleInfiniteGridLoader';

export interface ArticlesPageProps {
	className?: string;
}

const reducers: ReducerList = {
	articlesPage: articlesPageReducer
};

const ArticlesPage: FC<ArticlesPageProps> = memo((props: ArticlesPageProps) => {
	const { className } = props;

	const dispatch = useAppDispatch();
	const inited = useSelector(getArticlesPageInited) || false;
	//const currentLimit = Math.min(limit, selectedTotal >= 0 && total > 0 ? total - selectedTotal : limit);

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
			{inited && <ArticlesPageFilters />}
			<PageWrapper className={classNames(classes.articlespage, {}, [className])}>
				<div className={classes.articlelist}>
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
			</PageWrapper>
		</DynamicModuleLoader>
	);
});

export default ArticlesPage;
