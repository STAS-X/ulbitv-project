import {
	getArticlesPageLimit,
	getArticlesPageSortField,
	getArticlesPageSortOrder,
	getArticlesPageFilter,
	getArticlesPageNumber,
	getArticlesPageHasMore,
	getArticlesPageCategory
} from '../../selectors/getArticlesPageData';
import { ArticleSchema } from '@/entities/Article/model/types/articleSchema';
import { createAppAsyncThunk, getErrorMessage, ThunkError } from '@/shared/types/thunk/thunkAction';
import { addQueryParams } from '@/shared/lib/url/queryParams/addQueryParams';

export const fetchNextArticlesPage = createAppAsyncThunk('articles/fetchNextArticlesPage', async (_, thunkApi) => {
	const { extra, rejectWithValue, dispatch, getState } = thunkApi;

	const limit = getArticlesPageLimit(getState());
	const page = getArticlesPageNumber(getState()) + 1;
	//const count = getArticlesPage.selectTotal(getState());
	const hasMore = getArticlesPageHasMore(getState());
	const field = getArticlesPageSortField(getState());
	const order = getArticlesPageSortOrder(getState());
	const filter = getArticlesPageFilter(getState());
	const category = getArticlesPageCategory(getState());

	if (!hasMore) return [];
	//console.log(count, page, limit, hasMore, 'get state data');

	try {
		addQueryParams({ field, order, filter, category: Array.isArray(category) ? category.join(',') : '' });

		const response = await extra.api.get<ArticleSchema[]>('/articles', {
			params: {
				_expand: 'user',
				_page: page,
				_limit: limit,
				_sort: field,
				_order: order,
				type_like: category,
				q: filter
			},
			paramsSerializer: (params) => {
				console.log(params, 'get params');
				return Object.entries(params)
					.map(([key, value]) =>
						Array.isArray(value)
							? value.map((item) => `${key}=${item as string}`).join('&')
							: `${key}=${value as string}`
					)
					.filter(Boolean)
					.join('&');
			}
		});

		if (!response.data) {
			throw new Error('error occured');
		}

		// dispatch(articlesPageActions.setHasMore(Boolean(response.data.length === limit)));
		// if (response.data.length > 0) {
		// 	dispatch(articlesPageActions.setPage(page));
		// 	if (response.headers['x-total-count']) {
		// 		//const currentArtilces = count + response.data.length;
		// 		const total = Number(response.headers['x-total-count']);
		// 		dispatch(articlesPageActions.setTotal(total));
		// 	}
		// 	//console.log(currentArtilces, total, Boolean(currentArtilces < total), 'data from thunk');
		// }
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
