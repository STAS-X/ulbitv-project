import { useCallback, useMemo, useRef } from 'react';
import { classNames } from '../classNames/classNames';
import { useSelector } from 'react-redux';
// eslint-disable-next-line stas-eslint-plugin/layer-imports
import {
	articlesPageActions,
	getArticlesPageFilter,
	// getArticlesPageCategory,
	useArticlesCategory,
	getArticlesPageSortField,
	getArticlesPageSortOrder,
	getArticlesPageView,
	getArticlesPageIsLoading
} from '@/pages/ArticlesPage';
import {
	ArticleView,
	SortFields,
	SortOrder,
	fieldsForSort,
	ordersForSort,
	ArticlesSearch,
	ArticlesSort
} from '../filters/sortTypes';
import { useAppDispatch } from '@/app/providers/StoreProvider';
import { useTranslation } from 'react-i18next';
import { OptionType } from '@/shared/ui/deprecated/Select/Select';

export const useArticleFilter = () => {
	const field = useSelector(getArticlesPageSortField);
	const order = useSelector(getArticlesPageSortOrder);
	const filter = useSelector(getArticlesPageFilter);
	const category = useArticlesCategory(); // useSelector(getArticlesPageCategory);
	const view = useSelector(getArticlesPageView);
	const isLoading = useSelector(getArticlesPageIsLoading);
	//const store = useStore<StateSchema>();

	const dispatch = useAppDispatch();
	const refSearch = useRef<HTMLInputElement | undefined>();
	const { t } = useTranslation(['articles']);

	const renderProgress = useCallback(
		(progressClass: string) => {
			if (isLoading) return <div className={classNames('', {}, [progressClass])}></div>;
			return null;
		},
		[isLoading]
	);

	const handleChangeView = useCallback(
		(newView: ArticleView) => {
			dispatch(articlesPageActions.setView(newView));
			dispatch(articlesPageActions.setScrollToArticleId(0));
		},
		[dispatch]
	);

	const handleSearchArticles = useCallback(
		(newSearch: ArticlesSearch) => {
			//if (newSearch === filter) return;

			dispatch(articlesPageActions.setFilter(newSearch));
			//await dispatch(fetchArticlesList());
		},
		[dispatch]
	);

	const handleCategoryArticles = useCallback(
		(newCategory: string[]) => {
			//if (newSearch === filter) return;

			dispatch(articlesPageActions.setCategory(newCategory));
		},
		[dispatch]
	);

	const handleSortArticles = useCallback(
		(newSort: ArticlesSort) => {
			//console.log(newSort, nextSort, 'next sort data');
			if (!newSort.field || !newSort.order) return;

			// Обнуляем текущий фильтр поиска
			//dispatch(articlesPageActions.setFilter(''));
			//if (refSearch?.current) refSearch.current.value = '';

			dispatch(articlesPageActions.setSortiration(newSort));
		},
		[dispatch]
	);

	const sortBy = useMemo(() => {
		return { field, order };
	}, [field, order]);

	const fields: OptionType<SortFields>[] = useMemo(() => {
		return fieldsForSort.map((field) => {
			return { value: field, description: t(`selectors.${field}`) };
		});
	}, [t]);
	const orders: OptionType<SortOrder>[] = useMemo(() => {
		return ordersForSort.map((order) => {
			return { value: order, description: t(`selectors.${order}`) };
		});
	}, [t]);

	return {
		field,
		order,
		filter,
		category,
		view,
		isLoading,
		refSearch,
		renderProgress,
		handleChangeView,
		handleSearchArticles,
		handleCategoryArticles,
		handleSortArticles,
		sortBy,
		fields,
		orders
	};
};
