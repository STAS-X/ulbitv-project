import { fetchCommentsByArticleId } from './../../../../pages/ArticleDetailesPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleData } from '@/entities/Article/model/selectors/getArticleData';
import { getAddCommentContent } from './../selectors/addCommentFormData';
import { getUserData } from '@/entities/User/model/selectors/getUser/getUser';
import { CommentSchema } from '@/entities/Comment/model/types/commentSchema';
import { createAppAsyncThunk, getErrorMessage, ThunkError } from '@/shared/types/thunk/thunkAction';

export interface ExtendedCommentData {
	key: string;
	value: string;
	content: string;
}
// First, create the thunk
export const sendComment = createAppAsyncThunk<CommentSchema, ExtendedCommentData>(
	'addCommentForm/sendComment',
	async (entityData, thunkApi) => {
		//console.log(authData, thunkApi, 'auth data completed thunk data');
		const { extra, rejectWithValue, getState } = thunkApi;
		const { key, value, content } = entityData;

		const userId = getUserData(getState())?.id;

		if (!userId || !content || !key || !value) {
			return rejectWithValue('Require data not found');
		}

		const newComment = {
			text: content,
			userId,
			[key]: value
		};

		try {
			const response = await extra.api.post<CommentSchema>('/comments', newComment);

			if (!response.data) {
				throw new Error('error');
			}

			return response.data;
		} catch (e: ThunkError) {
			console.log(e.message, 'Внимание, во время запроса возникла ошибка');
			if (!e.response || !e.message) throw e;
			return rejectWithValue(getErrorMessage(e));
		}
	}
);
