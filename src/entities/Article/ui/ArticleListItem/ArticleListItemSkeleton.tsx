import { FC, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ArticleListItem.module.scss';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { Skeleton as SkeletonDepracated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Card as CardRedesign } from '@/shared/ui/redesign/Card/Card';
import { Skeleton as SkeletonRedesign } from '@/shared/ui/redesign/Skeleton/Skeleton';
import { ArticleView } from '@/shared/lib/filters/sortTypes';
import { toggleFeatures } from '@/shared/lib/features/ToggleFeatures';

export interface ArticleListItemSkeletonProps {
	className?: string;
	children?: ReactNode;
	view: ArticleView;
}

export const ArticleListItemSkeleton: FC<ArticleListItemSkeletonProps> = memo((props: ArticleListItemSkeletonProps) => {
	const { view, className } = props;
	// @ts-ignore
	const Card = toggleFeatures({ feature: 'isAppRedesined', on: CardRedesign, off: CardDeprecated });
	// @ts-ignore
	const Skeleton = toggleFeatures({ feature: 'isAppRedesined', on: SkeletonRedesign, off: SkeletonDepracated });

	if (view === ArticleView.LIST) {
		return (
			<div className={classNames('', {}, [className, classes[view]])}>
				<Card className={classes.card}>
					<div className={classes.header}>
						<Skeleton border={'50%'} width={30} height={30} className={classes.avatar} />
						<Skeleton width={150} height={20} className={classes.username} />
						<Skeleton width={100} height={20} className={classes.date} />
					</div>
					<Skeleton width={250} height={24} className={classes.title} />
					<Skeleton height={200} className={classes.img} />
					<div className={classes.footer}>
						<Skeleton width={200} height={40} className={classes.types} />
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className={classNames('', {}, [className, classes[view]])}>
			<Card className={classes.card}>
				<div className={classes.imagewrapper}>
					<Skeleton width={200} height={200} className={classes.img} />
				</div>
				<div className={classes.infowrapper}>
					<Skeleton width={130} height={20} className={classes.types} />
				</div>
				<Skeleton width={150} height={20} className={classes.title} />
			</Card>
		</div>
	);
});
