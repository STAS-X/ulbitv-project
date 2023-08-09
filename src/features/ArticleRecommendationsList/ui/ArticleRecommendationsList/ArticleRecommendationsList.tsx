import { FC, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextSize, TextTheme } from '@/shared/ui/deprecated/Text/Text';
// eslint-disable-next-line stas-eslint-plugin/import-public-api
import { ArticleList } from '@/entities/Article/ui/ArticleList/ArticleList';
import { ArticleView } from '@/shared/lib/filters/sortTypes';
import { VStack } from '@/shared/ui/redesign/Stack';
import classes from './ArticleRecommendationsList.module.scss';
import { getErrorMessage } from '@/shared/types/thunk/thunkAction';
import { useGetRecommendationByArticleQuery } from '../../api/useArticleRecommendations';

export interface ArticleRecommendationsListProps {
	className?: string;
	children?: ReactNode;
}

export const ArticleRecommendationsList: FC<ArticleRecommendationsListProps> = memo(
	(props: ArticleRecommendationsListProps) => {
		const { className } = props;

		const { t } = useTranslation();

		const {
			data: recomendations = [],
			isLoading: recomendaionsIsLoading,
			error: recomendationsError
		} = useGetRecommendationByArticleQuery(3);

		const errorMessage = recomendationsError ? getErrorMessage(recomendationsError) : '';

		return (
			<VStack dataTestId={'Article.Recommendation'} gap={10} max
className={classNames('', {}, [className])}>
				<Text size={TextSize.L} className={classes.title} title={t('recommendedForm', { ns: 'articles' })} />
				{errorMessage && (
					<Text
						size={TextSize.S}
						theme={TextTheme.ERROR}
						className={classes.title}
						title={t('recommendedError', { ns: 'articles', message: errorMessage })}
					/>
				)}
				{!errorMessage && (
					<ArticleList
						className={classes.recommendation}
						articles={recomendations}
						isLoading={recomendaionsIsLoading}
						view={ArticleView.TILE}
						hasMore={false}
					/>
				)}
			</VStack>
		);
	}
);
