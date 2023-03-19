import { LoginSchema } from '../../types/loginSchema';
import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getLogin = (state?: StateSchema) => state?.loginForm;
export const getLoginName = createSelector(getLogin, (loginForm: LoginSchema | undefined) => loginForm?.username);
export const getLoginPassword = createSelector(getLogin, (loginForm: LoginSchema | undefined) => loginForm?.password);
