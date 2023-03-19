/* eslint-disable @typescript-eslint/unbound-method */
import axios from 'axios';
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/testAsyncThunk';
import { fetchProfileData } from './fetchProfileData';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

describe('loginByUsername selector test', () => {
	const testThunk = new TestAsyncThunk(fetchProfileData);
	const userValue = { username: 'admin', password: '12345', id: '1' };
	// beforeEach(() => {
	// 	dispatch = jest.fn();
	// 	getState = jest.fn();
	// });

	test('should fulfilled', async () => {
		mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
		const result = await testThunk.callThunk(userValue);

		console.log(result, 'result data from action');
		expect(testThunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
		expect(testThunk.dispatch).toHaveBeenCalledTimes(3);
		expect(mockedAxios.post).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toBe(userValue);
	});

	test('should rejected', async () => {
		mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
		const result = await testThunk.callThunk(userValue);

		expect(testThunk.dispatch).toHaveBeenCalledTimes(2);
		expect(mockedAxios.post).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('rejected');
	});
});
