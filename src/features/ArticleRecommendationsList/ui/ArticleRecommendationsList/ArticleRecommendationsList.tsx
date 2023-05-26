import { FC, memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { ArticleList, ArticleView } from 'entities/Article';
import { VStack } from 'shared/ui/Stack';
import classes from './ArticleRecommendationsList.module.scss';
import { getErrorMessage } from 'shared/types/thunk/thunkAction';
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
			error: recomendaionsError
		} = useGetRecommendationByArticleQuery(3);

		const errorMessage = getErrorMessage(recomendaionsError);

		return (
			<VStack gap={10} max className={classNames('', {}, [className])}>
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
