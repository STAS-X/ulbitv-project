import { ProfileSchema } from 'entities/Profile';
import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

export const getProfile = (state: StateSchema) => state?.profile;
export const getProfileData = createSelector(getProfile, (profile: ProfileSchema | undefined) => profile?.data);
export const getProfileError = createSelector(getProfile, (profile: ProfileSchema | undefined) => profile?.error);
export const getProfileIsLoading = createSelector(
	getProfile,
	(profile: ProfileSchema | undefined) => profile?.isLoading
);
