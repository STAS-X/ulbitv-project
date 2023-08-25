import { FC, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ArticleListItem.module.scss';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { Skeleton as SkeletonDepracated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Card as CardRedesign } from '@/shared/ui/redesign/Card/Card';
import { Skeleton as SkeletonRedesign } from '@/shared/ui/redesign/Skeleton/Skeleton';
import { ArticleView } from '@/shared/lib/filters/sortTypes';
import { toggleFeatures } from '@/shared/lib/features/ToggleFeatures';
import { HStack, VStack } from '@/shared/ui/redesign/Stack';

export interface ArticleListItemSkeletonProps {
	className?: string;
	children?: ReactNode;
	view: ArticleView;
}

export const ArticleListItemSkeleton: FC<ArticleListItemSkeletonProps> = memo((props: ArticleListItemSkeletonProps) => {
	const { view, className } = props;
	// @ts-ignore
	const Card = toggleFeatures({ feature: 'isAppRedesigned', on: CardRedesign, off: CardDeprecated });
	// @ts-ignore
	const Skeleton = toggleFeatures({ feature: 'isAppRedesigned', on: SkeletonRedesign, off: SkeletonDepracated });

	if (view === ArticleView.LIST) {
		return (
			<Card paddings={24}>
				<VStack gap={16}>
					<HStack justify="between" max>
						<Skeleton border={'50%'} width={30} height={30} />
						<Skeleton width={150} height={20} />
					</HStack>
					<Skeleton width={250} height={24} />
					<Skeleton width={150} height={20} />
					<Skeleton height={400} />
					<HStack justify="between" max>
						<Skeleton width={160} height={50} />
						<HStack>
							<Skeleton border={'50%'} width={20} height={20} />
							<Skeleton width={50} height={20} />
						</HStack>
					</HStack>
				</VStack>
			</Card>
		);
	}

	return (
		<Card paddings={16}>
			<VStack gap={16}>
				<Skeleton width={'100%'} height={150} />
				<Skeleton width={150} height={20} />
				<HStack justify="between" gap={8} max>
					<Skeleton width={60} height={20} />
					<HStack>
						<Skeleton border={'50%'} width={20} height={20} />
						<Skeleton width={30} height={20} />
					</HStack>
				</HStack>
				<HStack gap={8}>
					<Skeleton border={'50%'} width={30} height={30} />
					<Skeleton width={100} height={20} />
				</HStack>
			</VStack>
		</Card>
	);
});
