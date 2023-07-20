import {
	ARTICLE_SELECTORS,
	ARTICLE_FILTER,
	ARTICLE_CATEGORY,
	SelectorType,
	ARTICLE_SORT,
	ARTICLE_VIEW
} from '@/shared/const/localstorage';
import {
	SortFields,
	SortOrder,
	fieldsForSort,
	ordersForSort,
	ArticlesSort,
	ArticleView
} from '@/shared/lib/filters/sortTypes';
import { OptionalRecord } from '@/shared/lib/url/queryParams/addQueryParams';
import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticlesPageSchema } from '../types/ArticlesPageSchema';
import { fetchNextArticlesPage } from '../services/fetchNextArticlesPage/fetchNextArticlesPage';
// eslint-disable-next-line stas-eslint-plugin/import-public-api
import { ArticleSchema, ArticleType } from '@/entities/Article/model/types/articleSchema';
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

const articlesAdapter = createEntityAdapter<ArticleSchema>({
	// Assume IDs are stored in a field other than `comment.id`
	selectId: (article) => article.id
	// sortComparer: (a, b) =>
	// 	Date.parse(a.createdAt).toLocaleString().localeCompare(Date.parse(b.createdAt).toLocaleString())
});

export const getArticlesPage = articlesAdapter.getSelectors<StateSchema>(
	(state) => state.articlesPage || articlesAdapter.getInitialState()
);

export const getSliceSelectors = articlesAdapter.getSelectors<StateSchema>(
	(state) => state.articlesPage || articlesAdapter.getInitialState()
);

const initDataFromLS = (lsData: SelectorType) => {
	const lsObject = localStorage.getItem(ARTICLE_SELECTORS)
		? JSON.parse(localStorage.getItem(ARTICLE_SELECTORS) ?? '')
		: {};
	switch (lsData) {
		case 'view':
			return lsObject && lsObject[ARTICLE_VIEW] ? (lsObject[ARTICLE_VIEW] as ArticleView) : ArticleView.LIST;
		case 'sortField':
			return lsObject && lsObject[ARTICLE_SORT] ? (lsObject[ARTICLE_SORT] as ArticlesSort).field : 'title';
		case 'sortOrder':
			return lsObject && lsObject[ARTICLE_SORT] ? (lsObject[ARTICLE_SORT] as ArticlesSort).order : 'asc';
		case 'filter':
			return lsObject && lsObject[ARTICLE_FILTER] ? lsObject[ARTICLE_FILTER] : '';
		case 'category':
			return lsObject && lsObject[ARTICLE_CATEGORY] ? lsObject[ARTICLE_CATEGORY] : [];
	}
};

const saveDataToLS = (lsData: SelectorType, data: any) => {
	const lsObject = localStorage.getItem(ARTICLE_SELECTORS)
		? JSON.parse(localStorage.getItem(ARTICLE_SELECTORS) ?? '')
		: {};
	switch (lsData) {
		case 'view':
			localStorage.setItem(
				ARTICLE_SELECTORS,
				JSON.stringify({ ...lsObject, [ARTICLE_VIEW]: data || ArticleView.LIST })
			);
			break;
		case 'sortField':
			if (!lsObject[ARTICLE_SORT]) lsObject[ARTICLE_SORT] = { field: data || 'title' };
			else lsObject[ARTICLE_SORT] = { ...lsObject[ARTICLE_SORT], field: data || 'title' };
			localStorage.setItem(ARTICLE_SELECTORS, JSON.stringify(lsObject));
			break;
		case 'sortOrder':
			if (!lsObject[ARTICLE_SORT]) lsObject[ARTICLE_SORT] = { order: data || 'asc' };
			else lsObject[ARTICLE_SORT] = { ...lsObject[ARTICLE_SORT], order: data || 'asc' };
			localStorage.setItem(ARTICLE_SELECTORS, JSON.stringify(lsObject));
			break;
		case 'filter':
			localStorage.setItem(ARTICLE_SELECTORS, JSON.stringify({ ...lsObject, [ARTICLE_FILTER]: data || '' }));
			break;
		case 'category':
			localStorage.setItem(ARTICLE_SELECTORS, JSON.stringify({ ...lsObject, [ARTICLE_CATEGORY]: data || [] }));
			break;
	}
};

const articlesPageSlice = createSlice({
	name: 'articlePageSlice',
	initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
		isLoading: false,
		error: undefined,
		view: initDataFromLS('view'),
		page: 0,
		total: 0,
		limit: initDataFromLS('view') === ArticleView.LIST ? 5 : 10,
		hasMore: true,
		scrollTo: 0,
		sortOrder: initDataFromLS('sortOrder'),
		sortField: initDataFromLS('sortField'),
		searchFilter: initDataFromLS('filter'),
		categoryFilter: initDataFromLS('category'),
		_target: '_blank',
		_inited: false,
		ids: [],
		entities: {}
	}),
	reducers: {
		setView: (state, action: PayloadAction<ArticleView>) => {
			if (action.payload !== state.view) {
				state.view = action.payload;
				saveDataToLS('view', action.payload);
				state.scrollTo = 0;
			}
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setTotal: (state, action: PayloadAction<number>) => {
			state.total = action.payload;
		},
		setTarget: (state, action: PayloadAction<string>) => {
			state._target = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setFilter: (state, action: PayloadAction<string>) => {
			if (state.searchFilter !== action.payload) {
				//console.log(state.searchFilter, action.payload, ' old filter + new filter');
				saveDataToLS('filter', action.payload);
				state.searchFilter = action.payload;
				// Для перезагрузки страницы удаляем все статьи и возвращаемся к первой странице
				articlesPageSlice.caseReducers.setReset(state);
			}
		},
		setCategory: (state, action: PayloadAction<string[]>) => {
			if (state.categoryFilter.join(',') !== action.payload.join(',')) {
				//state.categoryFilter = action.payload;
				//console.log(action.payload, 'category setter');
				saveDataToLS('category', action.payload);
				state.categoryFilter = action.payload;
				// Для перезагрузки страницы удаляем все статьи и возвращаемся к первой странице
				articlesPageSlice.caseReducers.setReset(state);
			}
		},
		setSortiration(state, action: PayloadAction<ArticlesSort>) {
			if (state.sortField !== action.payload.field || state.sortOrder !== action.payload.order) {
				//state.sortField = action.payload.field;
				//state.sortOrder = action.payload.order;
				if (state.sortField !== action.payload.field) {
					saveDataToLS('sortField', action.payload.field);
					state.sortField = action.payload.field;
				}

				if (state.sortOrder !== action.payload.order) {
					saveDataToLS('sortOrder', action.payload.order);
					state.sortOrder = action.payload.order;
				}
				// Для перезагрузки страницы удаляем все статьи и возвращаемся к первой странице
				articlesPageSlice.caseReducers.setReset(state);
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
		setReset: (state) => {
			state.page = 0;
			state.scrollTo = 0;
			state.hasMore = true;
			articlesAdapter.removeAll(state);
		},
		initState: (state, action: PayloadAction<OptionalRecord>) => {
			articlesPageSlice.getInitialState();
			console.log(action.payload, 'set new params');
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
						console.log(value, 'init category value');
						if (value) {
							const categorySet = Array.from(new Set(value.split(',')));
							state.categoryFilter = categorySet.filter((category) =>
								(Object.values(ArticleType) as string[]).includes(category)
							);
						} else state.categoryFilter = [];
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
			if (action.payload.length > 0) {
				articlesAdapter.addMany(state, action.payload);
				if (state.page) state.page += 1;
				else state.page = 1;
			}
			state.hasMore = action.payload.length === state.limit;
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(fetchNextArticlesPage.rejected, (state, action) => {
			state.isLoading = false;
			state.hasMore = false;
			state.error = action.payload || action.error?.message || 'Unknown error';
		});
	}
});

export const { actions: articlesPageActions, reducer: articlesPageReducer } = articlesPageSlice;
