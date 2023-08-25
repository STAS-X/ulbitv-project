import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ArticleSortSelector.module.scss';
import { OptionType, Select } from '@/shared/ui/deprecated/Select/Select';
import { useTranslation } from 'react-i18next';
import { ArticlesSort, SortFields, SortOrder } from '@/shared/lib/filters/sortTypes';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';
import { ListBoxSelectorItem, ListBoxSelector } from '@/shared/ui/redesign/ListBox/ListBoxSelector';
import { VStack } from '@/shared/ui/redesign/Stack';

export type ArticleSortType = { field: string; order: string };

interface ArticleSortSelectorProps {
	className?: string;
	sortBy: ArticlesSort;
	fields: OptionType<SortFields>[];
	orders: OptionType<SortOrder>[];
	onSortArticle?: (newSort: ArticlesSort) => void;
}

export const ArticleSortSelector: FC<ArticleSortSelectorProps> = memo<ArticleSortSelectorProps>(
	(props: ArticleSortSelectorProps) => {
		const { className = '', sortBy, fields, orders, onSortArticle } = props;

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

		const fieldsItems: ListBoxSelectorItem<SortFields>[] = useMemo(() => {
			return Object.values(fields).map(({ value, description }, index) => {
				return { id: index, value, content: description };
			});
		}, [fields]);

		const ordersItems: ListBoxSelectorItem<SortOrder>[] = useMemo(() => {
			return Object.values(orders).map(({ value, description }, index) => {
				return { id: index, value, content: description };
			});
		}, [orders]);

		useEffect(() => {
			if (field && order)
				handleChangeSortiration({
					field,
					order
				});
		}, [handleChangeSortiration, field, order]);

		return (
			<div className={classNames(classes.sortiration, {}, [className])}>
				<ToggleFeatures
					feature={'isAppRedesigned'}
					on={
						<VStack data-testid={'ArticleSortSelector'} gap={16} max>
							<ListBoxSelector
								dataTestId={'Article.Sort.Field'}
								placeholder={t('selectors.fieldHolder')}
								readonly={false}
								labelblock={true}
								value={field ?? sortBy.field}
								items={fieldsItems}
								onChange={setField}
							/>
							<ListBoxSelector
								dataTestId={'Article.Sort.Order'}
								placeholder={t('selectors.orderHolder')}
								readonly={false}
								labelblock={true}
								value={order ?? sortBy.order}
								items={ordersItems}
								onChange={setOrder}
							/>
						</VStack>
					}
					off={
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
					}
				/>
			</div>
		);
	}
);
