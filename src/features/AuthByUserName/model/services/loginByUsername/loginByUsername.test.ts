/* eslint-disable @typescript-eslint/unbound-method */
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/testAsyncThunk';
import { loginByUsername } from './loginByUsername';

//jest.mock('axios');
describe('loginByUsername selector test', () => {
	// {
	// 	baseURL: 'http://localhost:8000',
	// 	headers: {
	// 		Authorization: 'test'
	// 	}
	// });
	//const mockedAxios = axios as jest.Mocked<typeof axios>;

	const testThunk = new TestAsyncThunk(loginByUsername);
	const userValue = { username: 'admin', password: '12345', id: '1' };
	// beforeEach(() => {
	// 	jest.resetAllMocks();
	// 	mockedAxios.get.mockResolvedValue({
	// 		data: userValue
	// 	});
	// });

	test('should fulfilled', async () => {
		testThunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
		const result = await testThunk.callThunk(userValue);

		console.log(result, 'result data from action');
		expect(testThunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
		expect(testThunk.dispatch).toHaveBeenCalledTimes(3);
		expect(testThunk.api.post).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toBe(userValue);
	});

	test('should rejected', async () => {
		testThunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
		const result = await testThunk.callThunk(userValue);

		expect(testThunk.dispatch).toHaveBeenCalledTimes(2);
		expect(testThunk.api.post).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('rejected');
	});
});
