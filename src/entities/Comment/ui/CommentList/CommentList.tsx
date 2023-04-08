import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { CommentSchema } from '../../model/types/commentSchema';
import { CommentCard } from '../CommentCard/CommentCard';
import classes from './CommentList.module.scss';

export interface CommentListProps {
	className?: string;
	comments?: CommentSchema[];
	isLoading?: boolean;
}

export const CommentList: FC<CommentListProps> = memo((props: CommentListProps) => {
	const { className, isLoading, comments } = props;
	const { t } = useTranslation(['comments']);

	return (
		<div className={classNames(classes.CommentList, {}, [className])}>
			{isLoading ? (
				comments?.length ? (
					<>
						{comments.map((comment, index) => (
							<div key={index} className={classes.comment}>
								<div className={classes.header}>
									<Skeleton width={32} height={32} border="50%" className={classes.avatar} />
									<Skeleton width={100} height={16} className={classes.username} />
								</div>
								<Skeleton width={'100%'} height={50} className={classes.text} />
							</div>
						))}
					</>
				) : (
					<div className={classes.comment}>
						<div className={classes.header}>
							<Skeleton width={32} height={32} border="50%" className={classes.avatar} />
							<Skeleton width={100} height={16} className={classes.username} />
						</div>
						<Skeleton width={'100%'} height={50} className={classes.text} />
					</div>
				)
			) : comments?.length ? (
				comments.map((comment) => <CommentCard className={classes.comment} key={comment.id} comment={comment} />)
			) : (
				<Text content={t('noComments')} />
			)}
		</div>
	);
});
