import { loginByUsername } from './../services/loginByUsername/loginByUsername';
import { LoginSchema } from '../types/loginSchema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: LoginSchema = {
	isLoading: false,
	username: '',
	password: ''
};

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setUserName: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		setUserPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		setEmpty: (state) => {
			state.username = state.password = state.error = '';
		}
	},
	extraReducers: (builder) => {
		// The `builder` callback form is used here because it provides correctly typed reducers from the action creators
		builder.addCase(loginByUsername.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(loginByUsername.fulfilled, (state) => {
			state.error = undefined;
			state.isLoading = false;
		});
		builder.addCase(loginByUsername.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload ? action.payload : action.error ? action.error.message : 'Unknown error';
		});
	}
});

export const { actions: loginActions, reducer: loginReducer } = loginSlice;
