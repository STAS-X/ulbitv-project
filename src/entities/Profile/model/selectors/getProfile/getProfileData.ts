import { ProfileData, ProfileSchema } from 'entities/Profile';
import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '../../../../../app/providers/StoreProvider';

export const getProfile = (state: StateSchema) => state?.profile;
export const getProfileData = createSelector(getProfile, (profile: ProfileSchema) => profile?.data);
