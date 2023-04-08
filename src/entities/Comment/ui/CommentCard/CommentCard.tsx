import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { CommentSchema } from '../../model/types/commentSchema';
import classes from './CommentCard.module.scss';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';

export interface CommentCardProps {
	className?: string;
	comment: CommentSchema;
}

export const CommentCard: FC<CommentCardProps> = memo((props: CommentCardProps) => {
	const { className, comment } = props;
	return (
		<div className={classNames(classes.commentcard, {}, [className])}>
			<AppLink to={`/${AppRoutes.PROFILE}/${comment.user.profileId}`} className={classes.header}>
				<Avatar src={comment.user.avatar} size={32} />
				<Text className={classes.username} title={comment.user.username} />
			</AppLink>
			<Text className={classes.text} content={comment.text} />
		</div>
	);
});
