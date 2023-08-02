import { FC, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/deprecated/Avatar/Avatar';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { CommentSchema } from '../../model/types/commentSchema';
import classes from './CommentCard.module.scss';
import { AppLink } from '@/shared/ui/deprecated/AppLink/AppLink';
import { HStack, VStack } from '@/shared/ui/deprecated/Stack';
import { getRouteProfile } from '@/shared/config/routeConfig';

export interface CommentCardProps {
	className?: string;
	children?: ReactNode;
	comment: CommentSchema;
}

export const CommentCard: FC<CommentCardProps> = memo((props: CommentCardProps) => {
	const { className, comment } = props;
	return (
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
	);
});
