import { ArticleSchema } from 'entities/Article/model/types/articleSchema';
import { createAppAsyncThunk, getErrorMessage, ThunkError } from 'shared/types/thunk/thunkAction';
import {
	getArticlesPageLimit,
	getArticlesPageSortField,
	getArticlesPageSortOrder,
	getArticlesPageFilter,
	getArticlesPageNumber,
	getArticlesPageCategory
} from '../../..';
import { addQueryParams } from 'shared/lib/url/queryParams/addQueryParams';

interface ArticlesListProps {
	page?: number;
	pageExpanded?: boolean;
}

export const fetchArticlesList = createAppAsyncThunk<ArticleSchema[], ArticlesListProps | undefined>(
	'articles/fetchArticlesList',
	async (props, thunkApi) => {
		const { extra, rejectWithValue, getState } = thunkApi;
		const pagesNums =
			getArticlesPageNumber(getState()) > 0 ? getArticlesPageNumber(getState()) : getArticlesPageNumber(getState()) + 1;
		const { page = pagesNums, pageExpanded = true } = props ? props : { page: pagesNums, pageExpanded: true };
		const limit = getArticlesPageLimit(getState());
		const field = getArticlesPageSortField(getState());
		const order = getArticlesPageSortOrder(getState());
		const filter = getArticlesPageFilter(getState());
		const category = getArticlesPageCategory(getState());

		try {
			addQueryParams({ field, order, filter });
			const response = await extra.api.get<ArticleSchema[]>('/articles', {
				params: {
					_expand: 'user',
					_page: pageExpanded ? 1 : page,
					_limit: pageExpanded ? page * limit : limit,
					_sort: field,
					_order: order
				}
			});

			if (!response.data) {
				throw new Error('error');
			}

			// if (page === 1 && response.headers['x-total-count']) {
			// 	const total = Number(response.headers['x-total-count']);
			// 	//dispatch(articlesPageActions.setTotal(total));
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
	}
);
