import { ArticleSchema, ArticleView } from 'entities/Article';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Observer } from 'shared/ui/Observer/Observer';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import classes from './ArticleList.module.scss';

export interface ArticleListProps {
	className?: string;
	articles: ArticleSchema[];
	isLoading?: boolean;
	hasMore?: boolean;
	limit?: number;
	view?: ArticleView;
	onLoadNext?: () => void;
}

export const ArticleList: FC<ArticleListProps> = memo((props: ArticleListProps) => {
	const { articles, isLoading, hasMore, limit = 1, view = ArticleView.LIST, onLoadNext, className } = props;

	const { t } = useTranslation(['articles']);
	const navigate = useNavigate();
	const renderArticles = (article: ArticleSchema) => {
		return <ArticleListItem key={article.id} article={article} view={view} navigateTo={onOpenArticle} />;
	};

	const renderSkeletons = (skeleton: { id: number }) => {
		return <ArticleListItemSkeleton key={skeleton.id} view={view} />;
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
				<>{articles?.length > 0 && articles.map((article) => renderArticles(article))}</>
				<>
					{Array.from({ length: limit }, (_, index) => {
						return { id: index + 1 };
					}).map((skeleton) => renderSkeletons(skeleton))}
				</>
			</div>
		);
	}

	return (
		<Observer className={classNames(classes.articlelist, {}, [className])} onScrollEnd={onLoadNext}>
			{articles.length > 0
				? articles.map((article) => renderArticles(article))
				: !isLoading && !hasMore && <Text content={t('noArticles')} />}
		</Observer>
	);
});