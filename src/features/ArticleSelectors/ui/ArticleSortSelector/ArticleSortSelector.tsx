import { FC, memo, useCallback, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ArticleSortSelector.module.scss';
import { OptionType, Select } from '@/shared/ui/Select/Select';
import { useTranslation } from 'react-i18next';
import { ArticlesSort, SortFields, SortOrder } from '@/shared/lib/filters/sortTypes';

export type ArticleSortType = { field: string; order: string };

export interface ArticleSortSelectorProps {
	className?: string;
	sortBy: ArticlesSort;
	fields: OptionType<SortFields>[];
	orders: OptionType<SortOrder>[];
	onSortArticle?: (newSort: ArticlesSort) => void;
}

export const ArticleSortSelector: FC<ArticleSortSelectorProps> = memo<ArticleSortSelectorProps>(
	(props: ArticleSortSelectorProps) => {
		const { className, sortBy, fields, orders, onSortArticle } = props;

		const [field, setField] = useState(sortBy.field);
		const [order, setOrder] = useState(sortBy.order);

		const { t } = useTranslation(['articles']);

		const handleChangeSortiration = useCallback(
			(newSort: ArticlesSort) => {
				if (onSortArticle) {
					onSortArticle(newSort);
				}
			},
			[onSortArticle]
		);

		useEffect(() => {
			if (field && order)
				handleChangeSortiration({
					field,
					order
				});
		}, [handleChangeSortiration, field, order]);

		return (
			<div className={classNames(classes.sortiration, {}, [className])}>
				{/*<div className={classes.title}>
				<Text title={t('selectors.formTitle')} />
	</div>*/}
				<div data-testid={'ArticleSortSelector'} className={classes.selectors}>
					<Select
						dataTestId={'Article.Sort.Field'}
						placeholder={t('selectors.fieldHolder')}
						readonly={false}
						value={field ?? sortBy.field}
						options={fields}
						onChange={setField}
					/>
					<Select
						dataTestId={'Article.Sort.Order'}
						placeholder={t('selectors.orderHolder')}
						readonly={false}
						value={order ?? sortBy.order}
						options={orders}
						onChange={setOrder}
					/>
				</div>
			</div>
		);
	}
);
