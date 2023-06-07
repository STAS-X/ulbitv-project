import { getArticleData } from '@/entities/Article/model/selectors/getArticleData';
import { useSelector } from 'react-redux';
import { CommentSchema } from '@/entities/Comment/model/types/commentSchema';
import { useState } from 'react';
import { sendComment, ExtendedCommentData } from '@/features/AddCommentForm/model/services/sendComment';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentFormActions } from '@/features/AddCommentForm/model/slices/addCommentFormSlice';

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
