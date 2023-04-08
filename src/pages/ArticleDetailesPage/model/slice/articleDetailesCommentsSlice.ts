import { ArticleDetailesCommentsSchema } from '../types/ArticleDetailesCommentsSchema';
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentSchema } from 'entities/Comment';
import { StateSchema } from 'app/providers/StoreProvider';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

const articleCommentsAdapter = createEntityAdapter<CommentSchema>({
	// Assume IDs are stored in a field other than `comment.id`
	selectId: (comment) => comment.id
});

export const getArticleComments = articleCommentsAdapter.getSelectors<StateSchema>(
	(state) => state.articleDetailesComments || articleCommentsAdapter.getInitialState()
);

const articleDetailesCommentsSlice = createSlice({
	name: 'articleDetailesCommentsSlice',
	initialState: articleCommentsAdapter.getInitialState<ArticleDetailesCommentsSchema>({
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
		builder.addCase(fetchCommentsByArticleId.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<CommentSchema[]>) => {
			articleCommentsAdapter.setAll(state, action.payload);
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(fetchCommentsByArticleId.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload || action.error?.message || 'Unknown error';
		});
	}
});

export const { actions: actionArticleComments, reducer: reducerArticleComments } = articleDetailesCommentsSlice;
