import { FC, memo, ReactNode, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
// eslint-disable-next-line stas-eslint-plugin/layer-imports
import { ArticleType } from '@/entities/Article';
import { DEBOUNCE_DELAY } from '../../const/localstorage';
import { useDebounce as useDebounceTab } from '../../lib/hooks/useDebounce';
import { Card } from '../Card/Card';
import classes from './Tabs.module.scss';

interface TabItem {
	value: ArticleType;
	content: ReactNode;
}

export interface TabsProps {
	className?: string;
	children?: ReactNode;
	tabs: TabItem[];
	category: string[];
	onTabClick?: (newCategory: string[]) => void;
}

export const Tabs: FC<TabsProps> = memo((props: TabsProps) => {
	const { className, tabs, category = [], onTabClick } = props;

	const [newCategory, setNewCategory] = useState(category);

	useDebounceTab(newCategory, DEBOUNCE_DELAY, onTabClick);

	//tabs.push(...tabs);
	const handleCategoryClick = useCallback(
		(tabValue: ArticleType) => {
			const categoryTo = [...newCategory];
			if (categoryTo.includes(tabValue)) {
				categoryTo.splice(categoryTo.indexOf(tabValue), 1);
			} else categoryTo.push(tabValue);
			setNewCategory(categoryTo);
			//if (Object.keys(category).includes(tabValue)) {
			//	delete category[tabValue];
			//} else category[tabValue] = tabValue;

			//if (onTabClick) onTabClick(newCategory);
		},
		[newCategory]
	);

	return (
		<div className={classNames(classes.tabs, {}, [className])}>
			{tabs.map((tab) => (
				<Card
					className={classNames(classes.cardtab, { [classes.selected]: newCategory.includes(tab.value as string) })}
					key={tab.value}
					onClick={() => handleCategoryClick(tab.value)}
				>
					{tab.content}
				</Card>
			))}
		</div>
	);
});
