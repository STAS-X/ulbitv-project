import { FC, memo, useCallback, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ArticleCategorySelector.module.scss';
import { useTranslation } from 'react-i18next';
import { useDebounce as useFilterDebounce } from '@/shared/lib/hooks/useDebounce';
import { DEBOUNCE_DELAY } from '@/shared/const/localstorage';
// eslint-disable-next-line stas-eslint-plugin/import-public-api
import { ArticleType } from '@/entities/Article/model/types/articleSchema';
import { Tabs } from '@/shared/ui/deprecated/Tabs/Tabs';
import { Tabs as TabsRedesign } from '@/shared/ui/redesign/Tabs/Tabs';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';

export interface ArticleCategorySelectorProps {
	className?: string;
	categoryBy?: string[];
	onCategoryArticle?: (categoryBy: string[]) => void;
}

export const ArticleCategorySelector: FC<ArticleCategorySelectorProps> = memo((props: ArticleCategorySelectorProps) => {
	const { className = '', categoryBy = [], onCategoryArticle } = props;

	const [category, setCategory] = useState(categoryBy);

	const { t } = useTranslation(['articles']);

	const handleChangeCategory = useCallback(
		(newCategory: string[]) => {
			setCategory(newCategory);
			if (onCategoryArticle) {
				onCategoryArticle(newCategory);
			}
		},
		[onCategoryArticle]
	);

	useFilterDebounce(category, DEBOUNCE_DELAY, handleChangeCategory);

	const tabs = useMemo(
		() =>
			Object.values(ArticleType).map((item) => {
				return { value: item, content: t(`category.${item}`) };
			}),
		[t]
	);

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={
				<div
					data-testid={'ArticleCategorySelector'}
					className={classNames(classes.categoryredesign, {}, [className])}
				>
					<TabsRedesign tabs={tabs} category={category} onTabClick={handleChangeCategory} />
				</div>
			}
			off={
				<div data-testid={'ArticleCategorySelector'} className={classNames(classes.category, {}, [className])}>
					<Tabs tabs={tabs} category={category} onTabClick={handleChangeCategory} />
				</div>
			}
		/>
	);
});
