import { getArticlesPageHasMore, getArticlesPageNumber } from './../../selectors/getArticlesPageData';
import { getArticlesPage } from './../../slices/articlePageSlice';
import { ArticleSchema } from 'entities/Article/model/types/articleSchema';
import { createAppAsyncThunk, getErrorMessage, ThunkError } from 'shared/types/thunk/thunkAction';
import { getArticlesPageLimit } from '../../selectors/getArticlesPageData';
import { articlesPageActions } from '../../slices/articlePageSlice';

export const fetchNextArticlesPage = createAppAsyncThunk('articles/fetchNextArticlesPage', async (_, thunkApi) => {
	const { extra, rejectWithValue, dispatch, getState } = thunkApi;

	const limit = getArticlesPageLimit(getState());
	const page = getArticlesPageNumber(getState()) + 1;
	const count = getArticlesPage.selectTotal(getState());
	const hasMore = getArticlesPageHasMore(getState());
	if (!hasMore) return [];
	console.log(limit, page, count, hasMore, getState().articlesPage, 'get state data');
	//console.log(count, page, limit, hasMore, 'get state data');

	try {
		const response = await extra.api.get<ArticleSchema[]>('/articles', {
			params: {
				_expand: 'user',
				_page: page,
				_limit: limit
			}
		});

		if (!response.data) {
			throw new Error('error occured');
		}

		if (response.headers['x-total-count']) {
			const total = Number(response.headers['x-total-count']);
			const currentArtilces = count + response.data.length;
			dispatch(articlesPageActions.setHasMore(Boolean(currentArtilces < total)));
			dispatch(articlesPageActions.setTotal(total));
			dispatch(articlesPageActions.setPage(page));
			//console.log(currentArtilces, total, Boolean(currentArtilces < total), 'data from thunk');
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
});
