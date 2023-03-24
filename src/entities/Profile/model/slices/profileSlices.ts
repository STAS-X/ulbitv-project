import { fetchProfileData } from './../services/fetchProfileData/fetchProfileData';
import { ProfileData, ProfileSchema } from 'entities/Profile';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

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
		updateProfile: (state, action: PayloadAction<ProfileData>) => {
			state.formData = { ...state.formData, ...action.payload };
		},
		saveProfile: (state, action: PayloadAction<ProfileData>) => {
			state.data = { ...state.data, ...action.payload };
		},
		cancelEditProfile: (state) => {
			state.readonly = true;
			state.formData = state.data;
		},
		setProfileReadOnly: (state, action: PayloadAction<boolean>) => {
			state.readonly = action.payload;
		}
	},
	extraReducers: (builder) => {
		// The `builder` callback form is used here because it provides correctly typed reducers from the action creators
		builder.addCase(fetchProfileData.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(fetchProfileData.fulfilled, (state, action) => {
			state.data = action.payload;
			state.formData = action.payload;
			state.isLoading = false;
		});
		builder.addCase(fetchProfileData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload || action.error?.message || 'Unknown error';
		});
		builder.addCase(updateProfileData.pending, (state) => {
			state.error = undefined;
			state.readonly = true;
			state.isLoading = true;
		});
		builder.addCase(updateProfileData.fulfilled, (state, action) => {
			state.data = action.payload;
			state.formData = action.payload;
			state.isLoading = false;
		});
		builder.addCase(updateProfileData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload || action.error?.message || 'Unknown error';
		});
	}
});

export const { actions: profileActions, reducer: profileReducer } = profileSlice;
