import { FC, memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './ArticleSearchSelector.module.scss';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { useDebounce as useFilterDebounce } from 'shared/lib/hooks/useDebounce';
import { DEBOUNCE_DELAY } from 'shared/const/localstorage';
import { ArticlesSearch } from 'pages/ArticlesPage/model/types/ArticlesPageSchema';

export interface ArticleSearchSelectorProps {
	className?: string;
	searchBy?: ArticlesSearch;
	onFilterArticle?: (filterBy: ArticlesSearch) => void;
}

export const ArticleSearchSelector: FC<ArticleSearchSelectorProps> = memo((props: ArticleSearchSelectorProps) => {
	const { className, searchBy = '', onFilterArticle } = props;

	const [filter, setFilter] = useState(searchBy);

	const { t } = useTranslation(['articles']);

	const handleChangeFiltration = useCallback(
		(newFilter: ArticlesSearch) => {
			if (onFilterArticle) {
				onFilterArticle(newFilter);
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
