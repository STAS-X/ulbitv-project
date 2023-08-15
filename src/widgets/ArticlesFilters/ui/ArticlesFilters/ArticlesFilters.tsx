import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ArticlesFilters.module.scss';
import { Card } from '@/shared/ui/redesign/Card/Card';
import { ArticleCategorySelector, ArticleSearchSelector, ArticleSortSelector } from '@/features/ArticleSelectors';
import { useArticleFilter } from '@/shared/lib/hooks/useArticleFilter';
import { VStack } from '@/shared/ui/redesign/Stack';

export interface ArticlesFiltersProps {
	className?: string;
}

export const ArticlesFilters: FC<ArticlesFiltersProps> = memo((props: ArticlesFiltersProps) => {
	const { className = '' } = props;

	const {
		filter,
		category,
		refSearch,
		handleSearchArticles,
		handleCategoryArticles,
		handleSortArticles,
		sortBy,
		fields,
		orders
	} = useArticleFilter();

	return (
		<Card className={classNames(classes.ArticlesFilters, {}, [className])} paddings={16}>
			<VStack gap={32}>
				<ArticleSearchSelector
					className={'searchredesign'}
					refInput={refSearch}
					searchBy={filter}
					onFilterArticle={handleSearchArticles}
				/>
				<ArticleSortSelector
					className={'sortredesign'}
					sortBy={sortBy}
					fields={fields}
					orders={orders}
					onSortArticle={handleSortArticles}
				/>
				<ArticleCategorySelector
					className={'categoryredesign'}
					categoryBy={category}
					onCategoryArticle={handleCategoryArticles}
				/>
			</VStack>
		</Card>
	);
});
