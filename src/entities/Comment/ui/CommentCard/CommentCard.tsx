import { FC, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Text } from '@/shared/ui/Text/Text';
import { CommentSchema } from '../../model/types/commentSchema';
import classes from './CommentCard.module.scss';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { AppRoutes } from '@/shared/config/routeConfig';
import { HStack, VStack } from '@/shared/ui/Stack';

export interface CommentCardProps {
	className?: string;
	children?: ReactNode;
	comment: CommentSchema;
}

export const CommentCard: FC<CommentCardProps> = memo((props: CommentCardProps) => {
	const { className, comment } = props;
	return (
		<VStack gap={8} className={classNames(classes.commentcard, {}, [className])} max>
			<AppLink to={`/${AppRoutes.PROFILE}/${comment.user.profileId}`}>
				<HStack gap={4}>
					<Avatar src={comment.user.avatar} size={32} />
					<Text className={classes.username} title={comment.user.username} />
				</HStack>
			</AppLink>
			<Text content={comment.text} />
		</VStack>
	);
});
