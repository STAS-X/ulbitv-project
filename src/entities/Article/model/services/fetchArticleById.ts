import { ArticleSchema } from './../types/articleSchema';
import { createAppAsyncThunk, getErrorMessage, ThunkError } from 'shared/types/thunk/thunkAction';

// export interface ProfileDataProps {
// 	username: string;
// 	password: string;
// }
export interface ArticleByIdProps {
	articleId?: string;
}

// First, create the thunk
export const fetchArticleById = createAppAsyncThunk<ArticleSchema, ArticleByIdProps>(
	'article/fetchArticleById',
	async (articleData, thunkApi) => {
		const { articleId } = articleData;
		const { extra, rejectWithValue } = thunkApi;

		if (!articleId) return rejectWithValue('articleIdNotFound');

		try {
			const response = await extra.api.get<ArticleSchema>(`/articles/${articleId}`, {
				params: {
					_expand: 'user'
				}
			});
			console.log(response.data, 'get data from json server');

			if (!response.data) {
				throw new Error('articleNotFound');
			}
			//throw new Error('network error occured');

			return response.data;
		} catch (e: ThunkError) {
			if (e.response?.status === 404) return rejectWithValue('articleNotFound');
			//if (!e.response || !e.message) throw e;
			return rejectWithValue(getErrorMessage(e));
		}
	}
);
