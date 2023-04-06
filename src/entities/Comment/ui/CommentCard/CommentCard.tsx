import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { CommentSchema } from '../../model/types/commentSchema';
import classes from './CommentCard.module.scss';

export interface CommentCardProps {
	className?: string;
	comment: CommentSchema;
	isLoading?: boolean;
}

export const CommentCard: FC<CommentCardProps> = memo((props: CommentCardProps) => {
	const { className, isLoading, comment } = props;
	return (
		<div className={classNames(classes.commentcard, {}, [className])}>
			{isLoading ? (
				<>
					<div className={classes.header}>
						<Skeleton width={32} height={32} border="50%" className={classes.avatar} />
						<Skeleton width={100} height={16} className={classes.username} />
					</div>
					<Skeleton width={'100%'} height={50} className={classes.text} />
				</>
			) : (
				<>
					<div className={classes.header}>
						<Avatar src={comment.user.avatar} size={32} />
						<Text className={classes.username} title={comment.user.username} />
					</div>
					<Text className={classes.text} content={comment.text} />
				</>
			)}
		</div>
	);
});
