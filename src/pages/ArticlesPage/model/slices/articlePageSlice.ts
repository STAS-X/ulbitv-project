import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { ArticlesPageSchema, fetchArticlesList, fetchNextArticlesPage } from 'pages/ArticlesPage';
import { ArticleSchema, ArticleView } from 'entities/Article/model/types/articleSchema';
import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ARTICLE_SORT, ARTICLE_VIEW } from 'shared/const/localstorage';
import { ArticlesSort } from '../types/ArticlesPageSchema';
import { getArticlesPageFilter } from '../selectors/getArticlesPageData';

const articlesAdapter = createEntityAdapter<ArticleSchema>({
	// Assume IDs are stored in a field other than `comment.id`
	selectId: (article) => article.id
	// sortComparer: (a, b) =>
	// 	Date.parse(a.createdAt).toLocaleString().localeCompare(Date.parse(b.createdAt).toLocaleString())
});

export const getArticlesPage = articlesAdapter.getSelectors<StateSchema>(
	(state) => state.articlesPage || articlesAdapter.getInitialState()
);

export const getFiltredArticles = createSelector(
	getArticlesPage.selectAll,
	getArticlesPageFilter,
	(articles, filterBy = '') => {
		try {
			const regex = new RegExp(filterBy);
			return articles.filter((article) => regex.test(article.title));
		} catch (error) {
			return [];
		}
	}
);

// export const getSliceSelectors = articlesAdapter.getSelectors<ArticlesPageSchema>(
// 	(state) => state || articlesAdapter.getInitialState()
// );

const initView = () =>
	localStorage.getItem(ARTICLE_VIEW) ? (localStorage.getItem(ARTICLE_VIEW) as ArticleView) : ArticleView.LIST;
const initSortField = () =>
	localStorage.getItem(ARTICLE_SORT)
		? (JSON.parse(localStorage.getItem(ARTICLE_SORT) as string) as ArticlesSort).field
		: 'title';
const initSortOrder = () =>
	localStorage.getItem(ARTICLE_SORT)
		? (JSON.parse(localStorage.getItem(ARTICLE_SORT) as string) as ArticlesSort).order
		: 'asc';

const articlesPageSlice = createSlice({
	name: 'articlePageSlice',
	initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
		isLoading: false,
		error: undefined,
		view: initView(),
		page: 0,
		total: 0,
		limit: initView() === ArticleView.LIST ? 5 : 10,
		hasMore: true,
		scrollTo: 0,
		sortOrder: initSortOrder(),
		sortField: initSortField(),
		searchFilter: '',
		_inited: false,
		ids: [],
		entities: {}
	}),
	reducers: {
		setView: (state, action: PayloadAction<ArticleView>) => {
			if (action.payload !== state.view) {
				state.view = action.payload;
				localStorage.setItem(ARTICLE_VIEW, action.payload);
				state.scrollTo = 0;
			}
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setTotal: (state, action: PayloadAction<number>) => {
			state.total = action.payload;
		},
		setFilter: (state, action: PayloadAction<string>) => {
			state.searchFilter = action.payload;
		},
		setSortiration(state, action: PayloadAction<ArticlesSort>) {
			state.sortField = action.payload.field;
			state.sortOrder = action.payload.order;
			localStorage.setItem(ARTICLE_SORT, JSON.stringify(action.payload));
			if (state.scrollTo) state.scrollTo = 0;
		},
		setScrollToArticleId: (state, action: PayloadAction<number>) => {
			state.scrollTo = action.payload;
			//localStorage.setItem(ARTICLE_SCROLL_TOP, String(action.payload));
		},
		setHasMore: (state, action: PayloadAction<boolean>) => {
			state.hasMore = action.payload;
			//console.log(action.payload, 'new hasMore');
		},
		initState: (state) => {
			articlesPageSlice.getInitialState();
			state._inited = true;
		}
	},
	extraReducers: (builder) => {
		// The `builder` callback form is used here because it provides correctly typed reducers from the action creators
		builder.addCase(fetchNextArticlesPage.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(fetchNextArticlesPage.fulfilled, (state, action: PayloadAction<ArticleSchema[]>) => {
			articlesAdapter.addMany(state, action.payload);
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(fetchNextArticlesPage.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload || action.error?.message || 'Unknown error';
		});

		builder.addCase(fetchArticlesList.pending, (state) => {
			articlesAdapter.removeAll(state);
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<ArticleSchema[]>) => {
			articlesAdapter.setAll(state, action.payload);
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(fetchArticlesList.rejected, (state, action) => {
			state._inited = false;
			state.isLoading = false;
			state.error = action.payload || action.error?.message || 'Unknown error';
		});
	}
});

export const { actions: articlesPageActions, reducer: articlesPageReducer } = articlesPageSlice;
