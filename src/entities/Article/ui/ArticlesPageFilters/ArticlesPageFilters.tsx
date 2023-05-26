import { FC, memo, ReactNode, useCallback, useMemo, useRef } from 'react';
import { ArticleSearchSelector } from 'features/ArticleSearchSelector/ArticleSearchSelector';
import { ArticleSortSelector } from 'features/ArticleSortSelector/ArticleSortSelector';
import { ArticleViewSelector } from 'features/ArticleViewSelector/ArticleViewSelector';
import { ArticleCategorySelector } from 'features/ArticleCategorySelector/ArticleCategorySelector';
import classes from './ArticlesPageFilters.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { articlesPageActions } from 'pages/ArticlesPage/model/slices/articlePageSlice';
import { useSelector } from 'react-redux';
import { fieldsForSort, ordersForSort } from 'shared/lib/filters/sortTypes';
import {
	getArticlesPageFilter,
	getArticlesPageCategory,
	getArticlesPageSortField,
	getArticlesPageSortOrder,
	getArticlesPageView,
	getArticlesPageIsLoading
} from 'pages/ArticlesPage/model/selectors/getArticlesPageData';
import { ArticleView } from '../../model/types/articleSchema';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { ArticlesSearch, ArticlesSort } from 'pages/ArticlesPage/model/types/ArticlesPageSchema';
import { useTranslation } from 'react-i18next';
import type { OptionType } from 'shared/ui/Select/Select';

export interface ArticlesPageFiltersProps {
	className?: string;
	children?: ReactNode;
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = memo((props: ArticlesPageFiltersProps) => {
	const { className } = props;

	const field = useSelector(getArticlesPageSortField);
	const order = useSelector(getArticlesPageSortOrder);
	const filter = useSelector(getArticlesPageFilter);
	const category = useSelector(getArticlesPageCategory);
	const view = useSelector(getArticlesPageView);
	const isLoading = useSelector(getArticlesPageIsLoading);
	//const store = useStore<StateSchema>();

	const dispatch = useAppDispatch();
	const refSearch = useRef<HTMLInputElement>();
	const { t } = useTranslation(['articles']);

	const renderProgress = useCallback(() => {
		if (isLoading) return <div className={classNames('', { [classes.inprogress]: true })}></div>;
		return null;
	}, [isLoading]);

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
				<ArticleSearchSelector refInput={refSearch} searchBy={filter} onFilterArticle={handleSearchArticles} />
			</div>
			<div className={classes.headercategory}>
				<ArticleCategorySelector categoryBy={category} onCategoryArticle={handleCategoryArticles} />
			</div>
			<div className={classes.headerviews}>
				<ArticleViewSelector view={view} onViewClick={handleChangeView} />
			</div>
			{renderProgress()}
		</div>
	);
});
