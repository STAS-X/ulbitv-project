import type { UserRoleType } from '../../types/userSchema';
import { UserSchema } from '../../../';
import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';

export const getUser = (state?: StateSchema) => state?.user;
export const getUserData = createSelector(getUser, (user: UserSchema | undefined) => user?.authData);
export const getUserRoles = createSelector(getUser, (user: UserSchema | undefined) => user?.authData?.roles);
export const getUserIsAdmin = createSelector(
	getUser,
	(user: UserSchema | undefined) => user?.authData?.roles?.includes('admin' as UserRoleType) || false
);
export const getUserStatus = createSelector(getUser, (user: UserSchema | undefined) => user?._loaded);
