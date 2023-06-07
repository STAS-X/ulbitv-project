import { FC, memo, useCallback, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ArticleCategorySelector.module.scss';
import { useTranslation } from 'react-i18next';
import { useDebounce as useFilterDebounce } from '@/shared/lib/hooks/useDebounce';
import { DEBOUNCE_DELAY } from '@/shared/const/localstorage';
import { ArticleType } from '@/entities/Article/model/types/articleSchema';
import { Tabs } from '../../shared/ui/Tabs/Tabs/Tabs';

export interface ArticleCategorySelectorProps {
	className?: string;
	categoryBy?: string[];
	onCategoryArticle?: (categoryBy: string[]) => void;
}

export const ArticleCategorySelector: FC<ArticleCategorySelectorProps> = memo((props: ArticleCategorySelectorProps) => {
	const { className, categoryBy = [], onCategoryArticle } = props;

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
		<div className={classNames(classes.category, {}, [className])}>
			<Tabs tabs={tabs} category={category} onTabClick={handleChangeCategory} />
		</div>
	);
});
