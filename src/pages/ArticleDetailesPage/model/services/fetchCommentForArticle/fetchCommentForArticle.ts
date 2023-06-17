import { getArticleData } from '@/entities/Article';
import { useSelector } from 'react-redux';
import { CommentSchema } from '@/entities/Comment';
import { useState } from 'react';
import { sendComment, ExtendedCommentData } from '@/features/AddCommentForm';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentFormActions } from '@/features/AddCommentForm';

export const useFetchCommentForArticle = () => {
	const [data, setData] = useState<CommentSchema | string>();
	const articleId = String(useSelector(getArticleData)?.id || '');

	const dispatch = useAppDispatch();

	return (content: string) => {
		const commentData: ExtendedCommentData = { key: 'articleId', value: articleId, content };
		if (articleId) {
			void dispatch(sendComment(commentData)).then(async (res) => {
				if (res.payload) {
					setData(res.payload);
					void (await dispatch(fetchCommentsByArticleId({ articleId })));
				} else dispatch(addCommentFormActions.setCommentError('comment post failed'));
			});
		}

		return data ? data : undefined;
	};
};
