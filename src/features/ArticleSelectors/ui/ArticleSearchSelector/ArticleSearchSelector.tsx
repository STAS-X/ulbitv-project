import { FC, ForwardedRef, memo, MutableRefObject, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import Search from '@/shared/assets/icons/search.svg';
import classes from './ArticleSearchSelector.module.scss';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/deprecated/Input/Input';
import { Input as InputRedesign } from '@/shared/ui/redesign/Input/Input';
import { useDebounce as useFilterDebounce } from '@/shared/lib/hooks/useDebounce';
import { DEBOUNCE_DELAY } from '@/shared/const/localstorage';
import { ArticlesSearch } from '@/shared/lib/filters/sortTypes';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';

export interface ArticleSearchSelectorProps {
	className?: string;
	refInput?: MutableRefObject<HTMLInputElement | undefined>;
	searchBy?: ArticlesSearch;
	onFilterArticle?: (filterBy: ArticlesSearch) => void;
}

export const ArticleSearchSelector: FC<ArticleSearchSelectorProps> = memo((props: ArticleSearchSelectorProps) => {
	const { className = '', searchBy = '', refInput, onFilterArticle } = props;

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
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={
					<div data-testid={'ArtricleSearch'} className={classes.filters}>
						<InputRedesign
							dataTestId={'Article.Filter'}
							ref={refInput as ForwardedRef<HTMLInputElement>}
							Svg={Search}
							className={classes.inputredesign}
							value={filter ?? searchBy}
							readonly={false}
							placeholder={t('search.filterHolder')}
							onChange={setFilter}
						/>
					</div>
				}
				off={
					<div data-testid={'ArtricleSearch'} className={classes.filters}>
						<Input
							dataTestId={'Article.Filter'}
							ref={refInput as ForwardedRef<HTMLInputElement>}
							className={classes.input}
							value={filter ?? searchBy}
							readonly={false}
							placeholder={t('search.filterHolder')}
							onChange={setFilter}
						/>
					</div>
				}
			/>
		</div>
	);
});
