import { FC, memo, MouseEventHandler, ReactNode, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleType } from '../../../../entities/Article/model/types/articleSchema';
import { Card } from '../../Card/Card';
import { Text } from '../../Text/Text';
import classes from './Tabs.module.scss';

interface TabItem {
	value: ArticleType;
	content: ReactNode;
}

export interface TabsProps {
	className?: string;
	tabs: TabItem[];
	category: string[];
	onTabClick?: (newCategory: string[]) => void;
}

export const Tabs: FC<TabsProps> = memo((props: TabsProps) => {
	const { className, tabs, category = [], onTabClick } = props;
	//tabs.push(...tabs);
	const handleCategoryClick = useCallback(
		(tabValue: ArticleType) => {
			const newCategory = [...category];
			console.log(newCategory, 'data category before update');
			if (newCategory.includes(tabValue)) {
				newCategory.splice(newCategory.indexOf(tabValue), 1);
			} else newCategory.push(tabValue);
			//if (Object.keys(category).includes(tabValue)) {
			//	delete category[tabValue];
			//} else category[tabValue] = tabValue;
			console.log(newCategory, 'data category after update');

			if (onTabClick) onTabClick(newCategory);
		},
		[onTabClick, category]
	);

	return (
		<div className={classNames(classes.tabs, {}, [className])}>
			{tabs.map((tab) => (
				<Card
					className={classNames(classes.cardtab, { [classes.selected]: category.includes(tab.value as string) })}
					key={tab.value}
					onClick={() => handleCategoryClick(tab.value)}
				>
					{tab.content}
				</Card>
			))}
		</div>
	);
});
