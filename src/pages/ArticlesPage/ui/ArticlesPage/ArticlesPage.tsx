import { ArticleSchema, ArticleView } from 'entities/Article/model/types/articleSchema';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { FC, memo, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { StateSchema, useAppDispatch } from 'app/providers/StoreProvider';
import { articlesPageReducer, getArticlesPage, articlesPageActions } from '../../model/slices/articlePageSlice';
import classes from './ArticlesPage.module.scss';
import {
	getArticlesPageHasMore,
	getArticlesPageIsLoading,
	getArticlesPageLimit,
	getArticlesPageTotal,
	getArticlesPageView
} from '../../model/selectors/getArticlesPageData';
import { ArticleViewSelector } from 'features/ArticleViewSelector/ArticleViewSelector';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';

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
	const currentLimit = Math.min(limit, articles?.length > 0 && total > 0 ? total - articles.length : limit);

	const onLoadNextArticlesPage = useCallback(async () => {
		if (_PROJECT_ !== 'storybook' && !isLoading && hasMore) await dispatch(fetchNextArticlesPage());
	}, [dispatch, isLoading, hasMore]);

	// const fetchArticlesPage = useCallback(async () => {
	// 	if (page === 0 && hasMore) {
	// 		dispatch(articlesPageActions.initState());
	// 		await onLoadNextArticlesPage();
	// 	}
	// }, [dispatch, onLoadNextArticlesPage, hasMore, page]);

	useEffect(() => {
		dispatch(articlesPageActions.initState());
	}, [dispatch]);
	console.log(isLoading, 'get loading status');

	const handleChangeView = useCallback(
		(newView: ArticleView) => {
			dispatch(articlesPageActions.setView(newView));
		},
		[dispatch]
	);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
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
