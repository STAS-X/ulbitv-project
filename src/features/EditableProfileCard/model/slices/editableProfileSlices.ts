import { updateEditableProfileData } from '../services/updateEditableProfileData/updateEditableProfileData';
import { validateEditableProfileData } from '../services/validateEditableProfile/validateEditableProfile';
import { fetchEditableProfileData } from '../services/fetchEditableProfileData/fetchEditableProfileData';
import { ProfileData, ProfileSchema } from 'entities/Profile/model/types/profileSchema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ProfileSchema = {
	readonly: true,
	isLoading: false,
	error: undefined,
	data: undefined,
	validateError: undefined
};

const editableProfileSlice = createSlice({
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
			state.validateError = undefined;
		},
		setProfileReadOnly: (state, action: PayloadAction<boolean>) => {
			state.readonly = action.payload;
		},
		checkProfileValidation: (state, action: PayloadAction<ProfileData>) => {
			if (action.payload) state.validateError = validateEditableProfileData(action.payload);
		}
	},
	extraReducers: (builder) => {
		// The `builder` callback form is used here because it provides correctly typed reducers from the action creators
		builder.addCase(fetchEditableProfileData.pending, (state) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(fetchEditableProfileData.fulfilled, (state, action) => {
			state.data = action.payload;
			state.formData = action.payload;
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(fetchEditableProfileData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload || action.error?.message || 'Unknown error';
		});
		builder.addCase(updateEditableProfileData.pending, (state) => {
			state.error = undefined;
			state.readonly = true;
			state.isLoading = true;
		});
		builder.addCase(updateEditableProfileData.fulfilled, (state, action) => {
			state.data = action.payload;
			state.formData = action.payload;
			state.isLoading = false;
			state.error = undefined;
		});
		builder.addCase(updateEditableProfileData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload || action.error?.message || 'Unknown error';
		});
	}
});

export const { actions: editableProfileActions, reducer: editableProfileReducer } = editableProfileSlice;
