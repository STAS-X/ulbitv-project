import { ProfileSchema } from 'entities/Profile';
import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

export const getEditableProfile = (state: StateSchema) => state?.profile;
export const getEditableProfileData = createSelector(
	getEditableProfile,
	(profile: ProfileSchema | undefined) => profile?.data
);
export const getEditableProfileFormData = createSelector(
	getEditableProfile,
	(profile: ProfileSchema | undefined) => profile?.formData
);
export const getEditableProfileError = createSelector(
	getEditableProfile,
	(profile: ProfileSchema | undefined) => profile?.error
);
export const getEditableProfileIsLoading = createSelector(
	getEditableProfile,
	(profile: ProfileSchema | undefined) => profile?.isLoading
);
export const getEditableProfileReadOnly = createSelector(
	getEditableProfile,
	(profile: ProfileSchema | undefined) => profile?.readonly
);
export const getEditableProfileValidation = createSelector(
	getEditableProfile,
	(profile: ProfileSchema | undefined) => profile?.validateError
);
