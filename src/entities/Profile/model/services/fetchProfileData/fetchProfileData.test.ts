/* eslint-disable @typescript-eslint/unbound-method */
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/testAsyncThunk';
import { fetchProfileData } from './fetchProfileData';

//jest.mock('axios');
//const mockedAxios = jest.mocked(axios, true);

describe('loginByUsername selector test', () => {
	const testThunk = new TestAsyncThunk(fetchProfileData);
	const profileValue = {
		first: 'Станислав',
		lastname: '-XXX-',
		age: 32,
		currency: 'RUB',
		country: 'Russia',
		city: 'Moscow',
		user: {
			id: '1',
			username: 'admin',
			avatar:
				'https://bipbap.ru/wp-content/uploads/2021/07/Kartinki-na-avu-v-VK-dlya-parnej-i-muzhchin-samye-klassnye-i-krutye-3.jpg'
		}
	};
	// beforeEach(() => {
	// 	dispatch = jest.fn();
	// 	getState = jest.fn();
	// });

	test('should fulfilled', async () => {
		testThunk.api.get.mockReturnValue(Promise.resolve({ data: profileValue }));
		const result = await testThunk.callThunk({ profileId: '1' });

		console.log(result, 'result data from action');
		//expect(testThunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
		expect(testThunk.dispatch).toHaveBeenCalledTimes(2);
		expect(testThunk.api.get).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toBe(profileValue);
	});

	test('should rejected', async () => {
		testThunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
		const result = await testThunk.callThunk({ profileId: '1' });

		expect(testThunk.dispatch).toHaveBeenCalledTimes(2);
		expect(testThunk.api.get).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('rejected');
	});
});
