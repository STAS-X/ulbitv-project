import { fetchArticlesList } from '../services/fetchArticesList/fetchArticlesList';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { ArticleSchema, ArticleView } from 'entities/Article/model/types/articleSchema';
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
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

const initView = () =>
	localStorage.getItem(ARTICLE_VIEW) ? (localStorage.getItem(ARTICLE_VIEW) as ArticleView) : ArticleView.LIST;

const articlesPageSlice = createSlice({
	name: 'articlePageSlice',
	initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
		isLoading: true,
		error: undefined,
		view: initView(),
		ids: [],
		entities: {}
	}),
	reducers: {
		setView: (state, action: PayloadAction<ArticleView>) => {
			state.view = action.payload;
			localStorage.setItem(ARTICLE_VIEW, action.payload);
		},
		initState: (state) => {
			state.view = initView();
		}
	},
	extraReducers: (builder) => {
		// The `builder` callback form is used here because it provides correctly typed reducers from the action creators
		builder.addCase(fetchArticlesList.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<ArticleSchema[]>) => {
			articlesAdapter.setAll(state, action.payload);
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(fetchArticlesList.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload || action.error?.message || 'Unknown error';
		});
	}
});

export const { actions: articlesPageActions, reducer: articlesPageReducer } = articlesPageSlice;
