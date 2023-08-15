import { FC, memo, ReactNode, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
// eslint-disable-next-line stas-eslint-plugin/layer-imports
import { ArticleType } from '@/entities/Article';
import { DEBOUNCE_DELAY } from '../../../const/localstorage';
import { useDebounce as useDebounceTab } from '../../../lib/hooks/useDebounce';
import { Card } from '../Card/Card';
import { Flex } from '../Stack/Flex/Flex';
import {Text} from '../Text/Text';
import classes from './Tabs.module.scss';
import { useTranslation } from 'react-i18next';

type TabDirection = 'row' | 'column';

interface TabItem {
	value: ArticleType;
	content: ReactNode;
}

export interface TabsProps {
	className?: string;
	children?: ReactNode;
	tabs: TabItem[];
	direction?: TabDirection;
	gap?: number;
	category: string[];
	onTabClick?: (newCategory: string[]) => void;
}

/**
 * Используем новые компоненты из папки redesigned
 */
export const Tabs: FC<TabsProps> = memo((props: TabsProps) => {
	const { className, tabs, direction = 'column', gap = 16, category = [], onTabClick } = props;

	const { t } = useTranslation(['articles']);

	const [newCategory, setNewCategory] = useState(category);

	useDebounceTab(newCategory, DEBOUNCE_DELAY, onTabClick);

	const handleCategoryClick = useCallback(
		(tabValue: ArticleType) => {
			const categoryTo = [...newCategory];
			if (categoryTo.includes(tabValue)) {
				categoryTo.splice(categoryTo.indexOf(tabValue), 1);
			} else categoryTo.push(tabValue);
			setNewCategory(categoryTo);
		},
		[newCategory]
	);

	return (
		<Flex
			className={classNames(classes.tabs, {}, [className])}
			direction={direction}
			gap={gap}
			align={direction === 'row' ? 'center' : 'start'}
			justify={direction === 'row' ? 'start' : 'center'}
		>
			{<Text className={classes.label} content={t('category.label')}/>}
			{tabs.map((tab) => (
				<Card
					dataTestId={`Article.Category.${tab.value}`}
					className={classNames(classes.cardtab, {
						[classes.selected]: newCategory.includes(tab.value as string)
					})}
					key={tab.value}
					border={'round'}
					onClick={() => handleCategoryClick(tab.value)}
				>
					{tab.content}
				</Card>
			))}
		</Flex>
	);
});
