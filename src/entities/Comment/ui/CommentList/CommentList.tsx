import { FC, memo, ReactNode, useCallback, useEffect, useState } from 'react';
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
import { AnimationProvider, useAnimationLibrarys } from '@/shared/lib/components/AnimationProvider';

export interface CommentListProps {
	className?: string;
	children?: ReactNode;
	comments?: CommentSchema[];
	isLoading?: boolean;
}

const CommentListWithAnimaton: FC<CommentListProps> = memo((props: CommentListProps) => {
	const { className, isLoading, comments = [] } = props;
	const { t } = useTranslation(['comments', 'error']);

	const [deletedItems, setDeletedItems] = useState<(string | undefined)[]>([]);
	const [animatedComments, setAnimatedComments] = useState<CommentSchema[] | []>(comments);

	const dispatch = useAppDispatch();

	const userId = useSelector(getUserId);
	const isAdmin = useSelector(getUserIsAdmin);
	const error = useSelector(getArticleCommentsError);

	useEffect(() => {
		if (
			comments.filter(
				(comment) => animatedComments.findIndex((animatedComment) => animatedComment.id === comment.id) < 0
			).length > 0 &&
			deletedItems.length === 0
		) {
			setAnimatedComments([
				...comments.filter(
					(comment) => animatedComments.findIndex((animatedComment) => animatedComment.id === comment.id) < 0
				),
				...animatedComments
			]);
		}
	}, [comments, deletedItems, animatedComments]);

	const {
		Spring: { useTransition, config, animated }
	} = useAnimationLibrarys();

	const transitions = useTransition(animatedComments, {
		from: {
			transform: `translateX(-100%) scale(0.5)`,
			marginBottom: '-100px',
			opacity: 0
		},
		enter: (comment: CommentSchema) => {
			//if (animateComments.findIndex((animatedComment) => animatedComment.id !== comment.id) > -1) return;
			return [
				{
					transform: 'translateX(-50%) scale(0.8)',
					marginBottom: '-70px',
					opacity: 0.1
				},
				{
					transform: 'translateX(0%) scale(1)',
					marginBottom: '0px',
					opacity: 1
				}
			];
		},
		leave: (comment: CommentSchema) => {
			console.log(comment, 'deleting');
			return [
				{
					transform: 'translateX(-50%) scale(0.8)',
					marginBottom: '-40px',
					opacity: 0.1
				},
				{
					transform: 'translateX(-100%) scale(0.5)',
					marginBottom: '-100px',
					opacity: 0
				}
			];
		},

		onDestroyed: (comment: CommentSchema) => {
			setTimeout(
				() =>
					setDeletedItems(
						(prevDeleted) => prevDeleted?.filter((deleteItemId) => deleteItemId !== comment.id)
					),
				500
			);
		},
		unique: true,
		trail: 50,
		config: { ...config.wobbly, duration: 250 }
	});

	// const additionDeleteAnimationClass = useCallback(
	// 	(commentId: string) => {
	// 		console.log(deleteId, commentId, 'deleted comment');
	// 		return deleteId === commentId ? classes.commentdelete : '';
	// 	},
	// 	[deleteId]
	// );

	const animatedCommments = transitions((style, comment: CommentSchema) => {
		return (
			<animated.div
				style={{
					...style,
					width: '100%',
					height: 'fit-content'
				}}
				key={comment.id}
			>
				<CommentCard
					className={classNames(classes.comment /**, {}, [additionDeleteAnimationClass(comment.id)]**/)}
					key={comment.id}
					comment={comment}
					onDelete={
						isAdmin &&
						comment.user.id === userId &&
						deletedItems.findIndex((deleteItem) => deleteItem === comment.id) < 0
							? () => handleDeleteComment(comment.id)
							: undefined
					}
				/>
			</animated.div>
		);
	});

	const handleDeleteComment = useCallback(
		(commentId: string) => {
			(async () => {
				if (commentId) {
					setDeletedItems((prevDeleted) => [...prevDeleted, commentId]);
					setAnimatedComments((prevAnimated) => prevAnimated.filter((prev) => prev.id !== commentId));
					await dispatch(deleteArticleCommentById({ commentId })).then((res) => {
						console.log(res.payload, 'payload after delete');
					});
				}
			})();
		},
		[dispatch]
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
							<VStack gap={10} key={index} className={classes.commentloading} max>
								<HStack gap={4}>
									<Skeleton width={32} height={32} border="50%" className={classes.avatar} />
									<Skeleton width={100} height={16} border={16} className={classes.username} />
								</HStack>
								<Skeleton width={'100%'} height={50} border={16} className={classes.text} />
							</VStack>
						))}
					</>
				) : (
					<VStack gap={10} className={classes.commentloading} max>
						<HStack gap={4}>
							<Skeleton width={32} height={32} border="50%" className={classes.avatar} />
							<Skeleton width={100} height={16} border={16} className={classes.username} />
						</HStack>
						<Skeleton width={'100%'} height={50} border={16} className={classes.text} />
					</VStack>
				)
			) : comments?.length ? (
				<VStack gap={10} max>
					{animatedCommments}
				</VStack>
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

const CommentListLazy = (props: CommentListProps) => {
	const { isLoaded } = useAnimationLibrarys();

	if (!isLoaded) {
		return null;
	}

	return <CommentListWithAnimaton {...props} />;
};

export const CommentList: FC<CommentListProps> = (props: CommentListProps) => {
	return (
		<AnimationProvider>
			<CommentListLazy {...props} />
		</AnimationProvider>
	);
};
