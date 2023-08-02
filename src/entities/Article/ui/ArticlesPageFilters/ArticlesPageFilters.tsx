import { FC, memo, ReactNode, useCallback, useMemo, useRef } from 'react';
import classes from './ArticlesPageFilters.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
// eslint-disable-next-line stas-eslint-plugin/layer-imports
import {
	articlesPageActions,
	getArticlesPageFilter,
	getArticlesPageCategory,
	getArticlesPageSortField,
	getArticlesPageSortOrder,
	getArticlesPageView,
	getArticlesPageIsLoading
} from '@/pages/ArticlesPage';
// eslint-disable-next-line stas-eslint-plugin/layer-imports
import {
	ArticleSearchSelector,
	ArticleSortSelector,
	ArticleViewSelector,
	ArticleCategorySelector
} from '@/features/ArticleSelectors';
import {
	ArticleView,
	SortFields,
	SortOrder,
	fieldsForSort,
	ordersForSort,
	ArticlesSearch,
	ArticlesSort
} from '@/shared/lib/filters/sortTypes';
import { useAppDispatch } from '@/app/providers/StoreProvider';
import { useTranslation } from 'react-i18next';
import { OptionType } from '@/shared/ui/deprecated/Select/Select';

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

	return (
		<div className={classNames(classes.articlesheader, {}, [className, 'articles-header'])}>
			{renderProgress()}
			<div className={classes.headerfilters}>
				<ArticleSortSelector
					sortBy={sortBy}
					fields={fields}
					orders={orders}
					onSortArticle={handleSortArticles}
				/>
				<ArticleSearchSelector refInput={refSearch} searchBy={filter} onFilterArticle={handleSearchArticles} />
			</div>
			<div className={classes.headercategory}>
				<ArticleCategorySelector categoryBy={category} onCategoryArticle={handleCategoryArticles} />
			</div>
			<div className={classes.headerviews}>
				<ArticleViewSelector view={view} onViewClick={handleChangeView} />
			</div>
		</div>
	);
});
