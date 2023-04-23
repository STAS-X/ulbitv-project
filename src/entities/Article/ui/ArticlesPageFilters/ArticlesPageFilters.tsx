import { FC, memo, useCallback, useMemo } from 'react';
import { ArticleSearchSelector } from 'features/ArticleSearchSelector/ArticleSearchSelector';
import { ArticleSortSelector } from 'features/ArticleSortSelector/ArticleSortSelector';
import { ArticleViewSelector } from 'features/ArticleViewSelector/ArticleViewSelector';
import classes from './ArticlesPageFilters.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { articlesPageActions } from 'pages/ArticlesPage/model/slices/articlePageSlice';
import { useSelector, useStore } from 'react-redux';
import { fieldsForSort, ordersForSort } from 'shared/lib/filters/sortTypes';
import {
	fetchArticlesList,
	getArticlesPageFilter,
	getArticlesPageInProcess,
	getArticlesPageScrollField,
	getArticlesPageScrollOrder,
	getArticlesPageView
} from 'pages/ArticlesPage';
import { ArticleView } from '../../model/types/articleSchema';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { ArticlesSearch, ArticlesSort } from 'pages/ArticlesPage/model/types/ArticlesPageSchema';
import { useTranslation } from 'react-i18next';
import type { OptionType } from 'shared/ui/Select/Select';

export interface ArticlesPageFiltersProps {
	className?: string;
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = memo((props: ArticlesPageFiltersProps) => {
	const { className } = props;

	const field = useSelector(getArticlesPageScrollField);
	const order = useSelector(getArticlesPageScrollOrder);
	const filter = useSelector(getArticlesPageFilter);
	const view = useSelector(getArticlesPageView);
	const inProgress = useSelector(getArticlesPageInProcess);
	//const store = useStore<StateSchema>();

	const dispatch = useAppDispatch();
	const { t } = useTranslation(['articles']);

	const renderProgress = useCallback(() => {
		if (inProgress) return <div className={classNames('', { [classes.inprogress]: true })}></div>;
		return null;
	}, [inProgress]);

	const handleChangeView = useCallback(
		(newView: ArticleView) => {
			dispatch(articlesPageActions.setView(newView));
		},
		[dispatch]
	);

	const handleSortArticles = useCallback(
		async (newSort: ArticlesSort) => {
			//console.log(newSort, nextSort, 'next sort data');
			//if (newSort.field === field && newSort.order === order) return;

			dispatch(articlesPageActions.setSortiration(newSort));
			await dispatch(fetchArticlesList());
		},
		[dispatch]
	);

	const handleSearchArticles = useCallback(
		async (newSearch: ArticlesSearch) => {
			//if (newSearch === filter) return;

			dispatch(articlesPageActions.setFilter(newSearch));
			await dispatch(fetchArticlesList());
			//dispatch(articlesPageActions.checkIsFiltred(store.getState()));
		},
		[dispatch]
	);

	const sortBy = useMemo(() => {
		return { field, order: order };
	}, [field, order]);
	const fields: OptionType[] = useMemo(() => {
		return fieldsForSort.map((field) => {
			return { value: field, description: t(`selectors.${field}`) };
		});
	}, [t]);
	const orders: OptionType[] = useMemo(() => {
		return ordersForSort.map((order) => {
			return { value: order, description: t(`selectors.${order}`) };
		});
	}, [t]);

	return (
		<div className={classNames(classes.articlesheader, {}, [className, 'articles-header'])}>
			<div className={classes.headerfilters}>
				<ArticleSortSelector sortBy={sortBy} fields={fields} orders={orders} onSortArticle={handleSortArticles} />
				<ArticleSearchSelector searchBy={filter} onFilterArticle={handleSearchArticles} />
			</div>
			<div className={classes.headerviews}>
				<ArticleViewSelector view={view} onViewClick={handleChangeView} />
			</div>
			{renderProgress()}
		</div>
	);
});
