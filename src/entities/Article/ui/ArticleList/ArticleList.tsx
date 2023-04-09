import { ArticleSchema, ArticleView } from 'entities/Article';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import classes from './ArticleList.module.scss';

export interface ArticleListProps {
	className?: string;
	articles: ArticleSchema[];
	isLoading?: boolean;
	view?: ArticleView;
}

export const ArticleList: FC<ArticleListProps> = memo((props: ArticleListProps) => {
	const { articles, isLoading, view = ArticleView.TILE, className } = props;

	const { t } = useTranslation(['articles']);
	const navigate = useNavigate();
	const renderArticles = (article: ArticleSchema) => {
		return <ArticleListItem key={article.id} article={article} view={view} navigateTo={onOpenArticle} />;
	};

	const renderSkeletons = (article: ArticleSchema) => {
		return <ArticleListItemSkeleton key={article.id} view={view} />;
	};

	const onOpenArticle = useCallback(
		(articleId: number) => {
			if (articleId) navigate(`/${AppRoutes.ARTICLES}/${articleId}`);
		},
		[navigate]
	);

	if (isLoading) {
		return (
			<div className={classNames(classes.articlelist, {}, [className])}>
				{articles.length ? articles.map((article) => renderSkeletons(article)) : <Text content={t('noArticles')} />}
			</div>
		);
	}

	return (
		<div className={classNames(classes.articlelist, {}, [className])}>
			{articles.length ? articles.map((article) => renderArticles(article)) : <Text content={t('noArticles')} />}
		</div>
	);
});
