import { StateSchema } from 'app/providers/StoreProvider';
import { fetchRecommendationsForArticle } from './../services/fetchRecommendationsForArticle/fetchRecommendationsForArticle';
import { ArticleSchema } from './../../../../entities/Article/model/types/articleSchema';
import { ArticleDetailesRecommendedSchema } from './../types/ArticleDetailesRecommendedSchema';
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

const articleRecommendedAdapter = createEntityAdapter<ArticleSchema>({
	// Assume IDs are stored in a field other than `comment.id`
	selectId: (article) => article.id
});

export const getArticleRecommended = articleRecommendedAdapter.getSelectors<StateSchema>(
	(state) => state.articleDetailesPage?.recommendations || articleRecommendedAdapter.getInitialState()
);

const articleDetailesRecommendedSlice = createSlice({
	name: 'articleDetailesRecommendedSlice',
	initialState: articleRecommendedAdapter.getInitialState<ArticleDetailesRecommendedSchema>({
		isLoading: true,
		error: undefined,
		ids: [],
		entities: {}
	}),
	reducers: {
		setArticleCommentsStatus: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		}
	},
	extraReducers: (builder) => {
		// The `builder` callback form is used here because it provides correctly typed reducers from the action creators
		builder.addCase(fetchRecommendationsForArticle.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(fetchRecommendationsForArticle.fulfilled, (state, action: PayloadAction<ArticleSchema[]>) => {
			articleRecommendedAdapter.setAll(state, action.payload);
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(fetchRecommendationsForArticle.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload || action.error?.message || 'Unknown error';
		});
	}
});

export const { actions: articleDetailesRecommended, reducer: reducerDetailesRecommended } =
	articleDetailesRecommendedSlice;
