import { createAppAsyncThunk, getErrorMessage, ThunkError } from '@/shared/types/thunk/thunkAction';
import { CommentSchema } from '@/entities/Comment';

// export interface ProfileDataProps {
// 	username: string;
// 	password: string;
// }
export interface ArticleCommentByIdProps {
	commentId?: string;
}

// First, create the thunk
export const deleteArticleCommentById = createAppAsyncThunk<{ commentId: string }, ArticleCommentByIdProps>(
	'comments/deleteArticleCommentById',
	async ({ commentId }, thunkApi) => {

		const { extra, rejectWithValue } = thunkApi;

		console.log(commentId, 'get deleted comment');
		if (!commentId) return rejectWithValue('commentIdNotFound');

		try {
			const response = await extra.api.delete<CommentSchema>(`/comments/${commentId}`);

			console.log(response, 'get deleted comment');
			//if (!response.data) {
			//	throw new Error('error');
			//}

			return { commentId };
		} catch (e: ThunkError) {
			console.log(e.message, 'Внимание, во время запроса возникла ошибка');
			//if (!e.response || !e.message) throw e;
			return rejectWithValue(getErrorMessage(e));
		}
	}
);
