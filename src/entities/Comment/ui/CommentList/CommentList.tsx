import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
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
			{comments?.length ? (
				comments.map((comment) => (
					<CommentCard className={classes.comment} key={comment.id} isLoading={isLoading} comment={comment} />
				))
			) : (
				<Text content={t('noComments')} />
			)}
		</div>
	);
});
