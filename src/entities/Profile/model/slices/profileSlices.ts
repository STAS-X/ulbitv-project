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
	}
});

export const { actions: profileActions, reducer: profileReducer } = profileSlice;
