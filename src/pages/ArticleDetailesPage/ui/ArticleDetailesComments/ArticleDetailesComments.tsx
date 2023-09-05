import { FC, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { StateSchema, useAppDispatch } from '@/app/providers/StoreProvider';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { useSelector } from 'react-redux';
import { CommentList, CommentSchema } from '@/entities/Comment';
import { useFetchCommentForArticle } from '../../model/services/fetchCommentForArticle/fetchCommentForArticle';
import { getArticleComments } from '../../model/slice/articleDetailesCommentsSlice';
import { getArticleCommentsIsLoading, useArticleComments } from '../../model/selectors/getArticleCommentsData';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { Text as TextRedesign } from '@/shared/ui/redesign/Text/Text';
import { AddCommentForm } from '@/features/AddCommentForm';
import { VStack } from '@/shared/ui/redesign/Stack';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';

export interface ArticleDetailesCommentsProps {
	className?: string;
	children?: ReactNode;
	id?: string;
}

export const ArticleDetailesComments: FC<ArticleDetailesCommentsProps> = (props: ArticleDetailesCommentsProps) => {
	const { className, id: articleId = '' } = props;
	const { t } = useTranslation('comments');

	const dispatch = useAppDispatch();
	const comments = useArticleComments(); // useSelector<StateSchema, CommentSchema[]>(getArticleComments.selectAll);
	const isLoading = useSelector(getArticleCommentsIsLoading);
	const sendCommentForArticle = useFetchCommentForArticle();

	useEffect(() => {
		const fetchCommentByArticle = async () => {
			if (_PROJECT_ !== 'storybook') {
				await dispatch(fetchCommentsByArticleId({ articleId }));
			}
		};
		void fetchCommentByArticle();
	}, [dispatch, articleId]);

	return (
		<VStack gap={10} max className={classNames('', {}, [className])}>
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={<TextRedesign title={t('commentForm')} bold/>}
				off={<Text title={t('commentForm')} />}
			/>
			<AddCommentForm onSendComment={sendCommentForArticle} />
			<CommentList isLoading={isLoading} comments={comments} />
		</VStack>
	);
};
