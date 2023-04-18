import { fetchNextArticlesPage } from './../services/fetchNextArticlesPage/fetchNextArticlesPage';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { ArticleSchema, ArticleView } from 'entities/Article/model/types/articleSchema';
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ARTICLE_VIEW } from 'shared/const/localstorage';

const articlesAdapter = createEntityAdapter<ArticleSchema>({
	// Assume IDs are stored in a field other than `comment.id`
	selectId: (article) => article.id,
	sortComparer: (a, b) =>
		Date.parse(a.createdAt).toLocaleString().localeCompare(Date.parse(b.createdAt).toLocaleString())
});

export const getArticlesPage = articlesAdapter.getSelectors<StateSchema>(
	(state) => state.articlesPage || articlesAdapter.getInitialState()
);

// export const getSliceSelectors = articlesAdapter.getSelectors<ArticlesPageSchema>(
// 	(state) => state || articlesAdapter.getInitialState()
// );

const initView = () =>
	localStorage.getItem(ARTICLE_VIEW) ? (localStorage.getItem(ARTICLE_VIEW) as ArticleView) : ArticleView.LIST;

const articlesPageSlice = createSlice({
	name: 'articlePageSlice',
	initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
		isLoading: false,
		error: undefined,
		view: initView(),
		page: 0,
		total: 0,
		limit: 5,
		hasMore: true,
		scrollTo: 0,
		_inited: false,
		ids: [],
		entities: {}
	}),
	reducers: {
		setView: (state, action: PayloadAction<ArticleView>) => {
			state.view = action.payload;
			localStorage.setItem(ARTICLE_VIEW, action.payload);
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setTotal: (state, action: PayloadAction<number>) => {
			state.total = action.payload;
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
			state.view = initView();
			state.limit = state.view === ArticleView.LIST ? 5 : 10;
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
	}
});

export const { actions: articlesPageActions, reducer: articlesPageReducer } = articlesPageSlice;
