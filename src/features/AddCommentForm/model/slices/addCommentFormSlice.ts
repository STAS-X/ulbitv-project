import { sendComment } from './../services/sendComment';
import { AddCommentFormSchema } from '../types/addCommentForm';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AddCommentFormSchema = {
	content: '',
	isLoading: false,
	error: undefined
};

const addCommentFormSlice = createSlice({
	name: 'addCommentFrom',
	initialState,
	reducers: {
		setCommentContent: (state, action: PayloadAction<string>) => {
			state.content = action.payload;
		},
		setCommentError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		}
	},
	extraReducers: (builder) => {
		// The `builder` callback form is used here because it provides correctly typed reducers from the action creators
		builder.addCase(sendComment.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(sendComment.fulfilled, (state) => {
			state.content = '';
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(sendComment.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload || action.error?.message || 'Unknown error';
		});
	}
});

export const { actions: addCommentFormActions, reducer: addCommentFormReducer } = addCommentFormSlice;
