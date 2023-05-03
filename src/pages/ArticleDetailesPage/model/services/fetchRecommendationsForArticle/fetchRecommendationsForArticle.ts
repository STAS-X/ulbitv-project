import { ArticleSchema } from 'entities/Article/model/types/articleSchema';
import { createAppAsyncThunk, getErrorMessage, ThunkError } from 'shared/types/thunk/thunkAction';

interface RecommendationsForArticle {
	articleId?: string;
}

// First, create the thunk
export const fetchRecommendationsForArticle = createAppAsyncThunk<ArticleSchema[], RecommendationsForArticle>(
	'articles/fetchRecommendationsForArticle',
	async (props, thunkApi) => {
		const { articleId } = props;
		const { extra, rejectWithValue } = thunkApi;

		//const limit = getState().articlesPage?.limit;
		if (!articleId || !Number(articleId)) return [];

		try {
			const response = await extra.api.get<ArticleSchema[]>(`/articles`, {
				params: {
					_limit: 4,
					id_ne: articleId
				}
			});

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
