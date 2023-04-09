import { ArticleSchema, ArticleTextBlockComponent, ArticleBlockType, ArticleView } from 'entities/Article';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './ArticleListItem.module.scss';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text } from 'shared/ui/Text/Text';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { ArticleTextBlock } from '../../model/types/articleSchema';

export interface ArticleListItemProps {
	className?: string;
	article: ArticleSchema;
	view: ArticleView;
	navigateTo?: (id: number) => void;
}

export const ArticleListItem: FC<ArticleListItemProps> = memo((props: ArticleListItemProps) => {
	const { article, view, navigateTo, className } = props;
	const { t } = useTranslation(['articles']);
	//const [isHover, bindHover] = useHover();

	const types = <Text content={article.type.join(',')} className={classes.types} />;
	const views = (
		<>
			<Text content={String(article.views)} className={classes.views} />
			<Icon Svg={EyeIcon} />
		</>
	);

	if (view === ArticleView.LIST) {
		const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
		return (
			<div className={classNames('', {}, [className, classes[view]])}>
				<Card className={classes.card}>
					<div className={classes.header}>
						<Avatar size={30} src={article.user.avatar} />
						<Text content={article.user.username} className={classes.username} />
						<Text content={article.createdAt} className={classes.date} />
					</div>
					<Text title={article.title} className={classes.title} />
					{types}

					<img src={article.img} alt={article.title} className={classes.img} />
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
		<div className={classNames('', {}, [className, classes[view]])}>
			<Card
				className={classes.card}
				onClick={() => {
					if (navigateTo) navigateTo(article.id);
				}}
			>
				<div className={classes.imagewrapper}>
					<img src={article.img} alt={article.title} className={classes.img} />
					<Text content={article.createdAt} className={classes.date} />
				</div>
				<div className={classes.infowrapper}>
					{types}
					{views}
				</div>
				<Text content={article.title} className={classes.title} />
			</Card>
		</div>
	);
});
