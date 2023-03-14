import { useAppDispatch } from 'app/providers/StoreProvider/config/store';
import { LoginByUsernameProps } from './../services/loginByUsername/loginByUsername';
import { loginByUsername } from 'features/AuthByUserName/model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from 'features/AuthByUserName/model/slices/loginSlice';
import { createAction, DeepPartial } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/loginSchema';
import { UserData } from 'entities/User';
describe('loginSlice.test', () => {
	const initialState: DeepPartial<LoginSchema> = { username: 'user', password: '123', error: '', isLoading: true };
	test('test set username', () => {
		expect(loginReducer(initialState as LoginSchema, loginActions.setUserName('test user')).username).toEqual(
			'test user'
		);
	});
	test('test set password', () => {
		expect(loginReducer(initialState as LoginSchema, loginActions.setUserPassword('321')).password).toEqual('321');
	});
	test('test set error', () => {
		expect(loginReducer(initialState as LoginSchema, loginActions.setError('error found')).error).toEqual(
			'error found'
		);
	});

	test('test for extrareducers pending', () => {
		const action = { type: loginByUsername.pending.type };
		const state = loginReducer(initialState as LoginSchema, action);
		expect(state).toEqual({ username: 'user', password: '123', error: undefined, isLoading: true });
	});

	test('test for extrareducers fulfilled', () => {
		const action = { type: loginByUsername.fulfilled.type, payload: {} };
		const state = loginReducer(initialState as LoginSchema, action);
		console.log(state, 'fulfilled');
		expect(state).toEqual({ username: 'user', password: '123', error: undefined, isLoading: false });
	});

	test('test for extrareducers rejected', () => {
		const action = { type: loginByUsername.rejected.type, payload: 'error reject' };
		const state = loginReducer(initialState as LoginSchema, action);
		console.log(state, 'rejected');
		expect(state.error).toEqual('error reject');
	});
});
