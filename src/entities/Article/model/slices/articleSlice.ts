import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticleById } from '../services/fetchArticleById';
import { ArticleDetailesSchema } from '../types/articleDetailesSchema';

const initialState: ArticleDetailesSchema = {
	isLoading: false,
	error: undefined,
	data: undefined
};

const articleDetailsSlice = createSlice({
	name: 'articleDetails',
	initialState,
	reducers: {
		setArticleError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		}
	},
	extraReducers: (builder) => {
		// The `builder` callback form is used here because it provides correctly typed reducers from the action creators
		builder.addCase(fetchArticleById.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(fetchArticleById.fulfilled, (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(fetchArticleById.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload || action.error?.message || 'Unknown error';
		});
	}
});

export const { actions: articleDetailsActions, reducer: articleDetailsReducer } = articleDetailsSlice;
