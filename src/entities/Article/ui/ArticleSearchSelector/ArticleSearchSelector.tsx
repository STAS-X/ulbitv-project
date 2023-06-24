import { FC, ForwardedRef, memo, MutableRefObject, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ArticleSearchSelector.module.scss';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/Input/Input';
import { useDebounce as useFilterDebounce } from '@/shared/lib/hooks/useDebounce';
import { DEBOUNCE_DELAY } from '@/shared/const/localstorage';
// eslint-disable-next-line stas-eslint-plugin/layer-imports
import { ArticlesSearch } from '@/pages/ArticlesPage';

export interface ArticleSearchSelectorProps {
	className?: string;
	refInput?: MutableRefObject<HTMLInputElement | undefined>;
	searchBy?: ArticlesSearch;
	onFilterArticle?: (filterBy: ArticlesSearch) => void;
}

export const ArticleSearchSelector: FC<ArticleSearchSelectorProps> = memo((props: ArticleSearchSelectorProps) => {
	const { className, searchBy = '', refInput, onFilterArticle } = props;

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
					ref={refInput as ForwardedRef<HTMLInputElement>}
					className={classes.input}
					value={filter ?? searchBy}
					readonly={false}
					placeholder={t('search.filterHolder')}
					onChange={setFilter}
				/>
			</div>
		</div>
	);
});
