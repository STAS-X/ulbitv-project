import { FC, memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text/Text';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { CommentSchema } from '../../model/types/commentSchema';
import { CommentCard } from '../CommentCard/CommentCard';
import classes from './CommentList.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';

export interface CommentListProps {
	className?: string;
	children?: ReactNode;
	comments?: CommentSchema[];
	isLoading?: boolean;
}

export const CommentList: FC<CommentListProps> = memo((props: CommentListProps) => {
	const { className, isLoading, comments } = props;
	const { t } = useTranslation(['comments']);

	return (
		<VStack gap={10} className={classNames(classes.commentlist, {}, [className])} max>
			{isLoading ? (
				comments?.length ? (
					<>
						{comments.map((comment, index) => (
							<VStack gap={10} key={index} className={classes.comment} max>
								<HStack gap={4}>
									<Skeleton width={32} height={32} border="50%" className={classes.avatar} />
									<Skeleton width={100} height={16} className={classes.username} />
								</HStack>
								<Skeleton width={'100%'} height={50} className={classes.text} />
							</VStack>
						))}
					</>
				) : (
					<VStack gap={10} className={classes.comment} max>
						<HStack gap={4}>
							<Skeleton width={32} height={32} border="50%" className={classes.avatar} />
							<Skeleton width={100} height={16} className={classes.username} />
						</HStack>
						<Skeleton width={'100%'} height={50} className={classes.text} />
					</VStack>
				)
			) : comments?.length ? (
				comments.map((comment) => <CommentCard className={classes.comment} key={comment.id} comment={comment} />)
			) : (
				<Text content={t('noComments')} />
			)}
		</VStack>
	);
});
