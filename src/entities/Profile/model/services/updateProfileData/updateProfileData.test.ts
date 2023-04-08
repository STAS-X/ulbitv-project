import { ValidateProfileError } from './../../types/profileSchema';
import { Country } from 'entities/Country/model/types/country';
import { Currency } from 'entities/Currency/model/types/currency';
/* eslint-disable @typescript-eslint/unbound-method */
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/testAsyncThunk';
import { updateProfileData } from './updateProfileData';

//jest.mock('axios');
//const mockedAxios = jest.mocked(axios, true);

describe('updateProfileData thunk test', () => {
	const profileData = {
		id: '1',
		first: 'Станислав',
		lastname: '-XYZ-',
		age: 33,
		currency: Currency.RUB,
		country: Country.Ukraine,
		city: 'Moscow',
		username: 'admin',
		avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg'
	};
	// beforeEach(() => {
	// 	dispatch = jest.fn();
	// 	getState = jest.fn();
	// });
	test('should success', async () => {
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				formData: profileData
			}
		});

		thunk.api.put.mockReturnValue(Promise.resolve({ data: profileData }));

		const result = await thunk.callThunk();

		expect(thunk.api.put).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toEqual(profileData);
	});

	test('should error', async () => {
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				formData: profileData
			}
		});
		thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

		const result = await thunk.callThunk();

		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toEqual('error occured');
	});

	test('should rejected', async () => {
		const testThunk = new TestAsyncThunk(updateProfileData, {
			profile: { formData: { ...profileData, age: 3, lastname: '' } }
		});
		//testThunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
		const result = await testThunk.callThunk();

		console.log(result?.payload, 'empty error data from action');
		//expect(testThunk.api.put).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toBe(
			JSON.stringify({
				[ValidateProfileError.INCORRECT_USER_LAST]: 'validation.last',
				[ValidateProfileError.INCORRECT_AGE]: 'validation.age'
			})
		);
	});
});
