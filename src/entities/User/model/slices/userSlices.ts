import { UserSchema } from 'entities/User';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {} as UserSchema;

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {}
});

export const { actions: userActions, reducer: userReducer } = userSlice;
