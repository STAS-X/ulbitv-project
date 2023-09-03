import { initAuthData } from './../services/initAuthData';
import { getJSONSettingByKey } from '../services/getJSONSettingByKey';
import { JSONSettings } from '@/shared/lib/settings/jsonSettings';
import { saveJSONSettingsByUser } from '../services/saveJSONSettings';
import { LOCAL_STORAGE_THEME_KEY, USER_LS_KEY } from '@/shared/const/localstorage';
import { UserData, UserSchema } from '../types/userSchema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeatureFlags, setInitFeatureFlags } from '@/shared/lib/features/featureFlag';

const initialState: UserSchema = { authData: undefined, _loaded: false };

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<UserData>) => {
			state.authData = action.payload;
			setInitFeatureFlags(action.payload.features);
			if (action.payload.jsonSettings?.theme)
				localStorage.setItem(LOCAL_STORAGE_THEME_KEY, action.payload.jsonSettings?.theme);
		},
		setFeaturesData: (state, action: PayloadAction<FeatureFlags>) => {
			if (state.authData) {
				state.authData.features = { ...state.authData.features, ...action.payload };
				setInitFeatureFlags(action.payload);
			}
		},
		logOut: (state) => {
			//const emptyUser = { id: '', username: '', password: '' };
			localStorage.removeItem(USER_LS_KEY);
			// localStorage.removeItem(FEATURES_LS_KEY);
			state.authData = undefined;
			state._loaded = false;
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
			if (state.authData) state.authData.jsonSettings = { /*...state.authData.jsonSettings,*/ ...payload };
		});

		builder.addCase(initAuthData.fulfilled, (state, { payload }: PayloadAction<UserData>) => {
			if (payload) {
				localStorage.setItem(USER_LS_KEY, JSON.stringify(payload));
				state.authData = payload;
			}
			state._loaded = true;
		});
		builder.addCase(initAuthData.rejected, (state, action) => {
			state._loaded = true;
		});
	}
});

export const { actions: userActions, reducer: userReducer } = userSlice;
