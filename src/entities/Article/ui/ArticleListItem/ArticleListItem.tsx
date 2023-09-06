import { ArticleSchema, ArticleBlockType, ArticleTextBlock } from '../../model/types/articleSchema';
import { ArticleView } from '@/shared/lib/filters/sortTypes';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { FC, memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ArticleListItem.module.scss';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Icon } from '@/shared/ui/redesign/Icon/Icon';
import { Text } from '@/shared/ui/redesign/Text/Text';
import { Card } from '@/shared/ui/redesign/Card/Card';
import { Avatar } from '@/shared/ui/redesign/Avatar/Avatar';
import { Button } from '@/shared/ui/redesign/Button/Button';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';
import { Image } from '@/shared/ui/redesign/Image/Image';
import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { HStack, VStack } from '@/shared/ui/redesign/Stack';

export interface ArticleListItemProps {
	className?: string;
	children?: ReactNode;
	article: ArticleSchema;
	view: ArticleView;
	scrollingTo?: (article: HTMLDivElement, id: number) => void;
	navigateTo?: (id: number) => void;
}

const ArticleListItemRedesign: FC<ArticleListItemProps> = memo((props: ArticleListItemProps) => {
	const { article, view, navigateTo, className } = props;
	const { t } = useTranslation(['articles']);

	const types = <Text content={article.type.join(',')} size={'m'} />;
	const views = (
		<HStack gap={8}>
			<Icon Svg={EyeIcon} />
			<Text content={String(article.views)} className={classes.views} />
		</HStack>
	);
	const userInfo = (
		<>
			<Avatar size={32} src={article.user.avatar} />
			<Text bold content={article.user.username} />
		</>
	);

	if (view === ArticleView.LIST) {
		const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
		return (
			<div data-testid={'ArticleItem'} className={classNames('article_list_item')} id={String(article.id)}>
				<Card
					className={classNames(classes.card, {}, [className, classes.cardlist, classes[view]])}
					paddings={24}
					max
				>
					<VStack max gap={16}>
						<HStack gap={8} max>
							{userInfo}
							<Text content={article.createdAt} className={classes.date} />
						</HStack>
						<Text dataTestId={'Article.Title'} bold title={article.title} />
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
						<HStack className={classes.footer} justify={'between'} max>
							<Button
								onClick={() => {
									if (navigateTo) navigateTo(article.id);
								}}
								variant={'outline'}
							>
								{t('readMore')}
							</Button>
							{views}
						</HStack>
					</VStack>
				</Card>
			</div>
		);
	}

	return (
		<div
			data-testid={'ArticleItem'}
			className={classNames('article_list_item', {}, [className, classes[view]])}
			id={String(article.id)}
		>
			<Card
				className={classNames(classes.card, {}, [classes.cardtile])}
				onClick={() => {
					if (navigateTo) navigateTo(article.id);
				}}
				border={'round'}
				paddings={16}
			>
				<VStack gap={8} className={classes.info}>
					<Image width={200} height={150} src={article.img}
alt={article.title} className={classes.img} />
					<Text dataTestId={'Article.Title'} content={article.title} className={classes.title} />
					<HStack justify={'between'} max>
						<Text content={article.createdAt} className={classes.date} />
						{views}
					</HStack>
					<HStack gap={4}>{userInfo}</HStack>
				</VStack>
			</Card>
		</div>
	);
});

export const ArticleListItem: FC<ArticleListItemProps> = (props: ArticleListItemProps) => {
	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			off={<ArticleListItemDeprecated {...props} />}
			on={<ArticleListItemRedesign {...props} />}
		/>
	);
};
