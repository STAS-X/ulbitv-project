import { getJSONSettingByKey } from '../services/getJSONSettingByKey';
import { JSONSettings } from '@/shared/lib/settings/jsonSettings';
import { saveJSONSettingsByUser } from '../services/saveJSONSettings';
import { USER_LS_KEY } from '@/shared/const/localstorage';
import { UserData, UserSchema } from '../types/userSchema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setInitFeatureFlags } from '@/shared/lib/features/featureFlag';

const initialState: UserSchema = { authData: undefined, _loaded: false };

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<UserData>) => {
			state.authData = action.payload;
			setInitFeatureFlags(action.payload.features);
		},
		initAuthData: (state) => {
			const user = localStorage.getItem(USER_LS_KEY);
			if (user) {
				state.authData = JSON.parse(user);
			} else state.authData = undefined;
			state._loaded = true;
			//console.log(state.authData, 'get auth data from state');
		},
		logOut: (state) => {
			//const emptyUser = { id: '', username: '', password: '' };
			localStorage.removeItem(USER_LS_KEY);
			state.authData = undefined;
		}
	},
	extraReducers: (builder) => {
		// The `builder` callback form is used here because it provides correctly typed reducers from the action creators
		// builder.addCase(saveJSONSettingsByUserId.pending, (state) => {
		// 	state.error = undefined;
		// 	state.isLoading = true;
		// });
		builder.addCase(saveJSONSettingsByUser.fulfilled, (state, { payload }: PayloadAction<JSONSettings>) => {
			if (state.authData) state.authData.jsonSettings = payload;
		});
		// builder.addCase(saveJSONSettingsByUserId.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = action.payload || action.error?.message || 'Unknown error';
		// });
		builder.addCase(getJSONSettingByKey.fulfilled, (state, { payload }: PayloadAction<Partial<JSONSettings>>) => {
			if (state.authData) state.authData.jsonSettings = { ...state.authData.jsonSettings, ...payload };
		});
	}
});

export const { actions: userActions, reducer: userReducer } = userSlice;
