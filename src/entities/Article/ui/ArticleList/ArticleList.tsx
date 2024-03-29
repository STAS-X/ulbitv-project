import { ArticleSchema } from '../../model/types/articleSchema';
import { ArticleView } from '@/shared/lib/filters/sortTypes';
import { FC, memo, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { Observer } from '@/shared/ui/deprecated/Observer/Observer';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import classes from './ArticleList.module.scss';
import { getRouteArticleDetailes } from '@/shared/config/routeConfig';

export interface ArticleListProps {
	className?: string;
	children?: ReactNode;
	articles: ArticleSchema[];
	isLoading?: boolean;
	hasMore?: boolean;
	limit?: number;
	filter?: string;
	target?: string;
	category?: string[];
	view?: ArticleView;
	onInitScroll?: (article: HTMLDivElement, id: number) => void;
	onLoadNext?: () => void;
}

export const ArticleList: FC<ArticleListProps> = memo((props: ArticleListProps) => {
	const {
		articles,
		isLoading,
		hasMore,
		limit = 1,
		filter = '',
		category = [],
		view = ArticleView.LIST,
		onInitScroll,
		onLoadNext,
		target = '',
		className = ''
	} = props;

	const { t } = useTranslation(['articles']);
	const navigate = useNavigate();
	const renderArticles = (article: ArticleSchema) => {
		return (
			<ArticleListItem
				key={article.id}
				article={article}
				view={view}
				scrollingTo={onInitScroll}
				navigateTo={onOpenArticle}
			/>
		);
	};

	const renderSkeletons = (skeleton: { id: number }) => {
		return <ArticleListItemSkeleton key={skeleton.id} view={view} />;
	};

	const onOpenArticle = useCallback(
		(articleId: number) => {
			if (target) {
				window.open(getRouteArticleDetailes(`${articleId}`), target);
			} else {
				if (articleId) navigate(getRouteArticleDetailes(`${articleId}`));
			}
		},
		[navigate, target]
	);

	const hasFilter = !!filter || category.length > 0;
	let messageElement: JSX.Element | null = null;

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
	} else {
		if (!hasMore && !hasFilter) {
			messageElement = <Text size={TextSize.L} content={t('noArticles')} />;
		} else {
			messageElement =
				hasMore || isLoading ? null : (
					<Text
						size={TextSize.L}
						content={t('noFiltredArticles', {
							filter,
							category: Array.isArray(category) ? category.join(', ') : 'ALL'
						})}
					/>
				);
		}
	}

	return (
		<Observer className={classNames(className || classes.articlelist, {}, [])} onScrollEnd={onLoadNext}>
			{articles.length > 0 ? articles.map((article) => renderArticles(article)) : messageElement}
		</Observer>
	);
});
