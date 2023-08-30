import { FC, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/deprecated/Avatar/Avatar';
import { Avatar as AvatarRedesign } from '@/shared/ui/redesign/Avatar/Avatar';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { Text as TextRedesign } from '@/shared/ui/redesign/Text/Text';
import { CommentSchema } from '../../model/types/commentSchema';
import classes from './CommentCard.module.scss';
import { AppLink } from '@/shared/ui/deprecated/AppLink/AppLink';
import { AppLink as AppLinkRedesign } from '@/shared/ui/redesign/AppLink/AppLink';
import { HStack, VStack } from '@/shared/ui/redesign/Stack';
import { getRouteProfile } from '@/shared/config/routeConfig';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';
import { Card } from '@/shared/ui/redesign/Card/Card';

export interface CommentCardProps {
	className?: string;
	children?: ReactNode;
	comment: CommentSchema;
}

export const CommentCard: FC<CommentCardProps> = memo((props: CommentCardProps) => {
	const { className, comment } = props;
	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={
				<Card
					dataTestId={'Article.CommentItem'}
					paddings={16}
					border={'standart'}
					max
				>
					<AppLinkRedesign className={classes.linkredesign} to={getRouteProfile(`${comment.user.profileId}`)}>
						<HStack gap={4}>
							<AvatarRedesign src={comment.user.avatar} size={32} />
							<TextRedesign className={classes.username} title={comment.user.username} />
						</HStack>
					</AppLinkRedesign>
					<TextRedesign dataTestId={'Comment.Content'} content={comment.text} />
				</Card>
			}
			off={
				<VStack
					dataTestId={'Article.CommentItem'}
					gap={8}
					className={classNames(classes.commentcard, {}, [className])}
					max
				>
					<AppLink to={getRouteProfile(`${comment.user.profileId}`)}>
						<HStack gap={4}>
							<Avatar src={comment.user.avatar} size={32} />
							<Text className={classes.username} title={comment.user.username} />
						</HStack>
					</AppLink>
					<Text dataTestId={'Comment.Content'} content={comment.text} />
				</VStack>
			}
		/>
	);
});
