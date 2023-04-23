import { FC, memo, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './ArticleSortSelector.module.scss';
import { OptionType, Select } from 'shared/ui/Select/Select';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { ArticlesSort } from '../../pages/ArticlesPage/model/types/ArticlesPageSchema';

export type ArticleSortType = { field: string; order: string };

export interface ArticleSortSelectorProps {
	className?: string;
	sortBy: ArticleSortType;
	fields: OptionType[];
	orders: OptionType[];
	onSortArticle?: (newSort: ArticlesSort) => void;
}

export const ArticleSortSelector: FC<ArticleSortSelectorProps> = memo((props: ArticleSortSelectorProps) => {
	const { className, sortBy, fields, orders, onSortArticle } = props;

	const [field, setField] = useState(sortBy.field);
	const [order, setOrder] = useState(sortBy.order);
	console.log(sortBy, 'init sortBy');
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
		handleChangeSortiration({
			field,
			order
		} as ArticlesSort);
	}, [handleChangeSortiration, field, order]);

	return (
		<div className={classNames(classes.sortiration, {}, [className])}>
			{/*<div className={classes.title}>
				<Text title={t('selectors.formTitle')} />
	</div>*/}
			<div className={classes.selectors}>
				<Select
					placeholder={t('selectors.fieldHolder')}
					readonly={false}
					value={field}
					options={fields}
					onChange={setField}
				/>
				<Select
					placeholder={t('selectors.orderHolder')}
					readonly={false}
					value={order}
					options={orders}
					onChange={setOrder}
				/>
			</div>
		</div>
	);
});
