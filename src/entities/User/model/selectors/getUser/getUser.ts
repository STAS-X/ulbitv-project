import { UserSchema } from 'entities/User';
import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getUser = (state: StateSchema) => state.user;
export const getUserData = createSelector(getUser, (user: UserSchema) => user.authData);
