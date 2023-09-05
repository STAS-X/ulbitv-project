import { FC, memo, ReactNode, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { Text as TextRedesign } from '@/shared/ui/redesign/Text/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesign } from '@/shared/ui/redesign/Skeleton/Skeleton';
import { CommentSchema } from '../../model/types/commentSchema';
import { CommentCard } from '../CommentCard/CommentCard';
import classes from './CommentList.module.scss';
import { HStack, VStack } from '@/shared/ui/redesign/Stack';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';
// eslint-disable-next-line stas-eslint-plugin/layer-imports
import { deleteArticleCommentById, getArticleCommentsError } from '@/pages/ArticleDetailesPage';
import { useAppDispatch } from '@/app/providers/StoreProvider';
import { useSelector } from 'react-redux';
import { getUserId, getUserIsAdmin } from '@/entities/User';

export interface CommentListProps {
	className?: string;
	children?: ReactNode;
	comments?: CommentSchema[];
	isLoading?: boolean;
}

export const CommentList: FC<CommentListProps> = memo((props: CommentListProps) => {
	const { className, isLoading, comments } = props;
	const { t } = useTranslation(['comments', 'error']);

	const [deleteId, setDeleteId] = useState<string>('');

	const dispatch = useAppDispatch();

	const userId = useSelector(getUserId);
	const isAdmin = useSelector(getUserIsAdmin);
	const error = useSelector(getArticleCommentsError);

	const additionDeleteAnimationClass = useCallback(
		(commentId: string) => {
			console.log(deleteId, commentId, 'deleted comment');
			return deleteId === commentId ? classes.commentdelete : '';
		},
		[deleteId]
	);

	const handleDeleteComment = useCallback(
		(commentId: string) => {
			(async () => {
				if (!deleteId) {
					setDeleteId(commentId);
					await dispatch(deleteArticleCommentById({ commentId })).then((res) => {
						console.log(res.payload, 'payload after delete');
						setDeleteId('');
					});
				}
			})();
		},
		[dispatch, deleteId]
	);
	// @ts-ignore
	const Skeleton = toggleFeatures({ feature: 'isAppRedesigned', on: SkeletonRedesign, off: SkeletonDeprecated });
	// @ts-ignore
	const Text = toggleFeatures({ feature: 'isAppRedesigned', on: TextRedesign, off: TextDeprecated });

	return (
		<VStack
			dataTestId={'Article.Comments.Frame'}
			gap={10}
			className={classNames(classes.commentlist, {}, [className])}
			max
		>
			{isLoading ? (
				comments?.length ? (
					<>
						{comments.map((comment, index) => (
							<VStack gap={10} key={index} className={classes.commentloading}
max>
								<HStack gap={4}>
									<Skeleton width={32} height={32} border="50%"
className={classes.avatar} />
									<Skeleton width={100} height={16} border={16}
className={classes.username} />
								</HStack>
								<Skeleton width={'100%'} height={50} border={16}
className={classes.text} />
							</VStack>
						))}
					</>
				) : (
					<VStack gap={10} className={classes.commentloading} max>
						<HStack gap={4}>
							<Skeleton width={32} height={32} border="50%"
className={classes.avatar} />
							<Skeleton width={100} height={16} border={16}
className={classes.username} />
						</HStack>
						<Skeleton width={'100%'} height={50} border={16}
className={classes.text} />
					</VStack>
				)
			) : comments?.length ? (
				comments.map((comment) => (
					<CommentCard
						className={classNames(classes.comment, {}, [additionDeleteAnimationClass(comment.id)])}
						key={comment.id}
						comment={comment}
						onDelete={
							isAdmin && comment.user.id === userId ? () => handleDeleteComment(comment.id) : undefined
						}
					/>
				))
			) : (
				<Text content={t('noComments')} />
			)}
			{error && (
				<ToggleFeatures
					feature={'isAppRedesigned'}
					on={<TextRedesign variant={'error'} content={t(error, { ns: 'error' })} />}
					off={<Text theme={TextTheme.ERROR} content={t(error, { ns: 'error' })} />}
				/>
			)}
		</VStack>
	);
});
