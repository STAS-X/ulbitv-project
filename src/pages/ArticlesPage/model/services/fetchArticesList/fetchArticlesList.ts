import { getArticlesPageFilter, getArticlesPageNumber } from './../../selectors/getArticlesPageData';
import { ArticleSchema } from 'entities/Article/model/types/articleSchema';
import { createAppAsyncThunk, getErrorMessage, ThunkError } from 'shared/types/thunk/thunkAction';
import { getArticlesPageLimit, getArticlesPageScrollField, getArticlesPageScrollOrder } from '../../..';

interface ArticlesListProps {
	page?: number;
	pageExpanded?: boolean;
}

export const fetchArticlesList = createAppAsyncThunk<ArticleSchema[], ArticlesListProps | undefined>(
	'articles/fetchArticlesList',
	async (props, thunkApi) => {
		const { extra, rejectWithValue, getState } = thunkApi;
		const { page = getArticlesPageNumber(getState()) + 1, pageExpanded = false } = props
			? props
			: { page: getArticlesPageNumber(getState()) + 1, pageExpanded: false };
		const limit = getArticlesPageLimit(getState());
		const field = getArticlesPageScrollField(getState());
		const order = getArticlesPageScrollOrder(getState());
		const filter = getArticlesPageFilter(getState());

		try {
			const response = await extra.api.get<ArticleSchema[]>('/articles', {
				params: {
					_expand: 'user',
					_page: pageExpanded ? 1 : page,
					_limit: pageExpanded ? page * limit : limit,
					_sort: field,
					_order: order,
					_q: filter
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
