import { USER_LS_KEY } from 'shared/const/localstorage';
import { UserData, UserSchema } from 'entities/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserSchema = {};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<UserData>) => {
			state.authData = action.payload;
		},
		initAuthData: (state) => {
			const user = localStorage.getItem(USER_LS_KEY);
			if (user) {
				state.authData = JSON.parse(user);
			}
		},
		logOut: (state) => {
			//const emptyUser = { id: '', username: '', password: '' };
			localStorage.removeItem(USER_LS_KEY);
			state.authData = null;
		}
	}
});

export const { actions: userActions, reducer: userReducer } = userSlice;
