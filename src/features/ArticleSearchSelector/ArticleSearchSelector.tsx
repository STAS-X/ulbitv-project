import { FC, memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './ArticleSearchSelector.module.scss';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { useDebounce as useFilterDebounce } from 'shared/lib/hooks/useDebounce';
import { DEBOUNCE_DELAY } from 'shared/const/localstorage';

export interface ArticleSearchSelectorProps {
	className?: string;
	searchBy?: string;
	onFilterArticle?: (filterBy: string) => void;
}

export const ArticleSearchSelector: FC<ArticleSearchSelectorProps> = memo((props: ArticleSearchSelectorProps) => {
	const { className, searchBy = '', onFilterArticle } = props;

	const [filter, setFilter] = useState(searchBy);

	const { t } = useTranslation(['articles']);

	const handleChangeFiltration = useCallback(
		(newFilter: string | number) => {
			if (onFilterArticle) {
				onFilterArticle(String(newFilter));
			}
		},
		[onFilterArticle]
	);

	useFilterDebounce(filter, DEBOUNCE_DELAY, handleChangeFiltration);

	return (
		<div className={classNames(classes.filtration, {}, [className])}>
			{/*<div className={classes.title}>
				<Text title={t('search.formTitle')} align={TextAlign.CENTER} />
	</div>*/}
			<div className={classes.filters}>
				<Input
					className={classes.input}
					value={filter}
					readonly={false}
					placeholder={t('search.filterHolder')}
					onChange={setFilter}
				/>
			</div>
		</div>
	);
});
