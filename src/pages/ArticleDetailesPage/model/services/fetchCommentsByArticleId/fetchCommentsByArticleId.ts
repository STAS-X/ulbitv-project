import { createAppAsyncThunk, getErrorMessage, ThunkError } from '@/shared/types/thunk/thunkAction';
import { CommentSchema } from '@/entities/Comment';

// export interface ProfileDataProps {
// 	username: string;
// 	password: string;
// }
export interface CommentsByArticleIdProps {
	articleId?: string;
}

// First, create the thunk
export const fetchCommentsByArticleId = createAppAsyncThunk<CommentSchema[], CommentsByArticleIdProps>(
	'comments/fetchCommentsByArticleId',
	async (articleData, thunkApi) => {
		const { articleId } = articleData;
		const { extra, rejectWithValue } = thunkApi;

		if (!articleId) return rejectWithValue('articleIdNotFound');

		try {
			const response = await extra.api.get<CommentSchema[]>(`/comments/${articleId}`);

			if (!response.data) {
				throw new Error('error');
			}
			//throw new Error('network error occured');
			// const commentsData = response.data.map((commentExt) => {
			// 	const {
			// 		id: commentId,
			// 		text,
			// 		user: { id: userId, username, avatar }
			// 	} = commentExt;
			// 	return { id: commentId, text, user: { id: userId, username, avatar } };
			// });

			return response.data;
		} catch (e: ThunkError) {
			console.log(e.message, 'Внимание, во время запроса возникла ошибка');
			//if (!e.response || !e.message) throw e;
			return rejectWithValue(getErrorMessage(e));
		}
	}
);
