import { ArticleSchema, ArticleBlockType, ArticleTextBlock } from '../../model/types/articleSchema';
import { ArticleView } from '@/shared/lib/filters/sortTypes';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { FC, memo, ReactNode, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ArticleListItem.module.scss';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Text } from '@/shared/ui/Text/Text';
import { Card } from '@/shared/ui/Card/Card';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';

import { DEBOUNCE_DELAY } from '@/shared/const/localstorage';
import { Image } from '@/shared/ui/Image/Image';

export interface ArticleListItemProps {
	className?: string;
	children?: ReactNode;
	article: ArticleSchema;
	view: ArticleView;
	scrollingTo?: (article: HTMLDivElement, id: number) => void;
	navigateTo?: (id: number) => void;
}

export const ArticleListItem: FC<ArticleListItemProps> = memo((props: ArticleListItemProps) => {
	const { article, view, scrollingTo, navigateTo, className } = props;
	const { t } = useTranslation(['articles']);
	//const [isHover, bindHover] = useHover();
	const articleParent = useRef<HTMLDivElement>(null);

	const types = <Text content={article.type.join(',')} className={classes.types} />;
	const views = (
		<>
			<Text content={String(article.views)} className={classes.views} />
			<Icon Svg={EyeIcon} />
		</>
	);

	const forceScrollTo = useCallback(() => {
		if (scrollingTo && articleParent?.current)
			if (articleParent.current) scrollingTo(articleParent.current, Number(article.id));
	}, [scrollingTo, article.id, articleParent]);

	useEffect(() => {
		// После подгрузки статьи запускаем функцию скролла к последней просмотренной статье
		setTimeout(forceScrollTo, DEBOUNCE_DELAY);
	}, [forceScrollTo]);

	if (view === ArticleView.LIST) {
		const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
		return (
			<div
				data-testid={'ArticleItem'}
				ref={articleParent}
				className={classNames('article_list_item', {}, [className, classes[view]])}
				id={String(article.id)}
			>
				<Card className={classNames(classes.card, {}, [classes.cardlist])}>
					<div className={classes.header}>
						<Avatar size={30} src={article.user.avatar} />
						<Text content={article.user.username} className={classes.username} />
						<Text content={article.createdAt} className={classes.date} />
					</div>
					<Text dataTestId={'Article.Title'} title={article.title} className={classes.title} />
					{types}

					<Image
						width={'100%'}
						height={250}
						border={15}
						src={article.img}
						alt={article.title}
						className={classes.img}
					/>
					{textBlock && <ArticleTextBlockComponent block={textBlock} className={classes.textblock} />}
					<div className={classes.footer}>
						<Button
							onClick={() => {
								if (navigateTo) navigateTo(article.id);
							}}
							theme={ButtonTheme.OUTLINE}
						>
							{t('readMore')}
						</Button>
						{views}
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div
			data-testid={'ArticleItem'}
			ref={articleParent}
			className={classNames('article_list_item', {}, [className, classes[view]])}
			id={String(article.id)}
		>
			<Card
				className={classNames(classes.card, {}, [classes.cardtile])}
				onClick={() => {
					if (navigateTo) navigateTo(article.id);
				}}
			>
				<div className={classes.imagewrapper}>
					<Image width={200} height={200} src={article.img}
alt={article.title} className={classes.img} />
					<Text content={article.createdAt} className={classes.date} />
				</div>
				<div className={classes.infowrapper}>
					{types}
					{views}
				</div>
				<Text dataTestId={'Article.Title'} content={article.title} className={classes.title} />
			</Card>
		</div>
	);
});
