import { ArticleSchema } from './../types/articleSchema';
import { createAppAsyncThunk, getErrorMessage, ThunkError } from 'shared/types/thunk/thunkAction';

// export interface ProfileDataProps {
// 	username: string;
// 	password: string;
// }
export interface ArticleByIdProps {
	articleId: number;
}

// First, create the thunk
export const fetchArticleById = createAppAsyncThunk<ArticleSchema, ArticleByIdProps>(
	'article/fetchArticleById',
	async (articleData, thunkApi) => {
		const { articleId } = articleData;
		const { extra, rejectWithValue } = thunkApi;

		try {
			const response = await extra.api.get<ArticleSchema>(`/articles/${articleId}`);

			if (!response.data) {
				throw new Error('error');
			}
			//throw new Error('network error occured');

			return response.data;
		} catch (e: ThunkError) {
			console.log(e.message, 'Внимание, во время запроса возникла ошибка');
			//if (!e.response || !e.message) throw e;
			return rejectWithValue(getErrorMessage(e));
		}
	}
);
