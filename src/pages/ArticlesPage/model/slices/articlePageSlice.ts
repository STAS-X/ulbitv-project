import { SortFields, SortOrder, fieldsForSort, ordersForSort } from 'shared/lib/filters/sortTypes';
import { OptionalRecord } from './../../../../shared/lib/url/queryParams/addQueryParams';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { ArticlesPageSchema, fetchArticlesList, fetchNextArticlesPage } from 'pages/ArticlesPage';
import { ArticleSchema, ArticleView, ArticleType } from 'entities/Article/model/types/articleSchema';
import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ARTICLE_SORT, ARTICLE_VIEW } from 'shared/const/localstorage';
import { ArticlesSort } from '../types/ArticlesPageSchema';
import { getArticlesPageCategory, getArticlesPageFilter } from '../selectors/getArticlesPageData';

const articlesAdapter = createEntityAdapter<ArticleSchema>({
	// Assume IDs are stored in a field other than `comment.id`
	selectId: (article) => article.id
	// sortComparer: (a, b) =>
	// 	Date.parse(a.createdAt).toLocaleString().localeCompare(Date.parse(b.createdAt).toLocaleString())
});

export const getArticlesPage = articlesAdapter.getSelectors<StateSchema>(
	(state) => state.articlesPage || articlesAdapter.getInitialState()
);

// Селектор для фильтрации статей на клиенте - пока не используем
export const getFiltredArticles = createSelector(
	[getArticlesPage.selectAll, getArticlesPageCategory, getArticlesPageFilter],
	(articles, categoryBy = [], filterBy = '') => {
		try {
			const regex = new RegExp(filterBy);
			const categoryArticles =
				categoryBy.length > 0
					? articles.filter((article) => article.type.some((category) => categoryBy.includes(category)))
					: articles;
			return categoryArticles.filter((article) => regex.test(article.title));
		} catch (error) {
			return [];
		}
	}
);

export const getSliceSelectors = articlesAdapter.getSelectors<StateSchema>(
	(state) => state.articlesPage || articlesAdapter.getInitialState()
);
const initView = () =>
	localStorage.getItem(ARTICLE_VIEW) ? (localStorage.getItem(ARTICLE_VIEW) as ArticleView) : ArticleView.LIST;
const initSortField = () =>
	localStorage.getItem(ARTICLE_SORT)
		? (JSON.parse(localStorage.getItem(ARTICLE_SORT) ?? '') as ArticlesSort).field
		: 'title';
const initSortOrder = () =>
	localStorage.getItem(ARTICLE_SORT)
		? (JSON.parse(localStorage.getItem(ARTICLE_SORT) ?? '') as ArticlesSort).order
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
		categoryFilter: [],
		isFiltered: false,
		inProcessed: false,
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
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setFilter: (state, action: PayloadAction<string>) => {
			if (state.searchFilter !== action.payload) {
				state.searchFilter = action.payload;
				state.scrollTo = 0;
			}
		},
		setCategory: (state, action: PayloadAction<string[]>) => {
			if (state.categoryFilter !== action.payload) {
				state.categoryFilter = action.payload;
				state.scrollTo = 0;
			}
		},
		setProcessing: (state, action: PayloadAction<boolean>) => {
			state.inProcessed = action.payload;
		},
		setSortiration(state, action: PayloadAction<ArticlesSort>) {
			if (state.sortField !== action.payload.field || state.sortOrder !== action.payload.order) {
				state.sortField = action.payload.field;
				state.sortOrder = action.payload.order;
				localStorage.setItem(ARTICLE_SORT, JSON.stringify(action.payload));
				state.searchFilter = '';
				state.scrollTo = 0;
			}
		},
		setScrollToArticleId: (state, action: PayloadAction<number>) => {
			state.scrollTo = action.payload;
			//localStorage.setItem(ARTICLE_SCROLL_TOP, String(action.payload));
		},
		setHasMore: (state, action: PayloadAction<boolean>) => {
			state.hasMore = action.payload;
			//console.log(action.payload, 'new hasMore');
		},
		initState: (state, action: PayloadAction<OptionalRecord>) => {
			articlesPageSlice.getInitialState();
			console.log(action.payload, 'set new sort params');
			Object.entries(action.payload).forEach(([name, value]) => {
				switch (name) {
					case 'field':
						if (fieldsForSort.includes(value as SortFields)) state.sortField = value as SortFields;
						break;
					case 'order':
						if (ordersForSort.includes(value as SortOrder)) state.sortOrder = value as SortOrder;
						break;
					case 'filter':
						state.searchFilter = String(value);
						break;
					case 'category':
						state.categoryFilter = value ? value.split('|') : [];
						break;
				}
			});
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
			if (action.payload.length > 0) articlesAdapter.addMany(state, action.payload);
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
			state.inProcessed = true;
		});
		builder.addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<ArticleSchema[]>) => {
			state.isLoading = false;
			state.inProcessed = false;
			state.error = undefined;
			if (action.payload.length > 0) articlesAdapter.setAll(state, action.payload);
		});
		builder.addCase(fetchArticlesList.rejected, (state, action) => {
			state.inProcessed = false;
			state.isLoading = false;
			state.error = action.payload || action.error?.message || 'Unknown error';
		});
	}
});

export const { actions: articlesPageActions, reducer: articlesPageReducer } = articlesPageSlice;
