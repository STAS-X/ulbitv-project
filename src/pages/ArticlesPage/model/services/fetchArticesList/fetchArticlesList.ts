import { ArticleSchema } from 'entities/Article/model/types/articleSchema';
import { createAppAsyncThunk, getErrorMessage, ThunkError } from 'shared/types/thunk/thunkAction';
import { getArticlesPageLimit } from '../../selectors/getArticlesPageData';
import { articlesPageActions } from '../../slices/articlePageSlice';

interface ArticlesListProps {
	page: number;
}

export const fetchArticlesList = createAppAsyncThunk<ArticleSchema[], ArticlesListProps>(
	'articles/fetchArticlesList',
	async (props, thunkApi) => {
		const { extra, rejectWithValue, dispatch, getState } = thunkApi;
		const { page } = props;
		const limit = getArticlesPageLimit(getState());

		try {
			const response = await extra.api.get<ArticleSchema[]>('/articles', {
				params: {
					_expand: 'user',
					_page: page,
					_limit: limit
				}
			});

			if (!response.data) {
				throw new Error('error');
			}

			if (page === 1 && response.headers['x-total-count']) {
				const total = Number(response.headers['x-total-count']);
				//dispatch(articlesPageActions.setTotal(total));
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
