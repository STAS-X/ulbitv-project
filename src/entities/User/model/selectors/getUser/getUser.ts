import type { UserSchema, UserRoleType } from '../../types/userSchema';
import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getUser = (state?: StateSchema) => state?.user;
export const getUserData = createSelector(getUser, (user: UserSchema | undefined) => user?.authData);
export const getUserId = createSelector(getUser, (user: UserSchema | undefined) => user?.authData?.id);
export const getUserRoles = createSelector(getUser, (user: UserSchema | undefined) => user?.authData?.roles);
export const getUserIsAdmin = createSelector(
	getUser,
	(user: UserSchema | undefined) => user?.authData?.roles?.includes('admin' as UserRoleType) || false
);
export const getUserStatus = createSelector(getUser, (user: UserSchema | undefined) => user?._loaded);
