import { FC, memo, ReactNode } from 'react';
import classes from './ArticlesPageFilters.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
// eslint-disable-next-line stas-eslint-plugin/layer-imports
import {
	ArticleSearchSelector,
	ArticleSortSelector,
	ArticleViewSelector,
	ArticleCategorySelector
} from '@/features/ArticleSelectors';
import { useArticleFilter } from '@/shared/lib/hooks/useArticleFilter';

export interface ArticlesPageFiltersProps {
	className?: string;
	children?: ReactNode;
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = memo((props: ArticlesPageFiltersProps) => {
	const { className } = props;

	const {
		filter,
		category,
		view,
		refSearch,
		renderProgress,
		handleChangeView,
		handleSearchArticles,
		handleCategoryArticles,
		handleSortArticles,
		sortBy,
		fields,
		orders
	} = useArticleFilter();


	return (
		<div className={classNames(classes.articlesheader, {}, [className, 'articles-header'])}>
			{renderProgress(classes.inprogress)}
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
