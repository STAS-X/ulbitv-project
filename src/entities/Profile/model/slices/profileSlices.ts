import { fetchProfileData } from './../services/fetchProfileData/fetchProfileData';
import { PROFILE_KEY } from 'shared/const/localstorage';
import { ProfileData, ProfileSchema } from 'entities/Profile';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ProfileSchema = {
	readonly: true,
	isLoading: false,
	error: undefined,
	data: undefined
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setProfileData: (state, action: PayloadAction<ProfileData>) => {
			state.data = action.payload;
		},
		initData: (state) => {
			const profile = localStorage.getItem(PROFILE_KEY);
			if (profile) {
				state.data = JSON.parse(profile);
			}
		}
	},
	extraReducers: (builder) => {
		// The `builder` callback form is used here because it provides correctly typed reducers from the action creators
		builder.addCase(fetchProfileData.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(fetchProfileData.fulfilled, (state, action) => {
			state.error = undefined;
			state.data = action.payload;
			state.isLoading = false;
		});
		builder.addCase(fetchProfileData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload || action.error?.message || 'Unknown error';
		});
	}
});

export const { actions: profileActions, reducer: profileReducer } = profileSlice;
