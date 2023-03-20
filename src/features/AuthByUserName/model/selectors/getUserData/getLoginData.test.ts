import { StateSchema } from 'app/providers/StoreProvider';
import { getLogin, getLoginName, getLoginPassword } from './getLoginData';

describe('getLoginData selector test', () => {
	const state: DeepPartial<StateSchema> = {
		loginForm: {
			username: 'user',
			password: '123',
			error: 'Error found',
			isLoading: true
		}
	};

	test('should return undefined', () => {
		expect(getLogin({} as StateSchema)?.error).toEqual(undefined);
	});

	test('should return error', () => {
		expect(getLogin(state as StateSchema)?.error).toEqual('Error found');
	});

	test('should return loading status', () => {
		expect(getLogin(state as StateSchema)?.isLoading).toEqual(true);
	});

	test('should return username', () => {
		expect(getLoginName(state as StateSchema)).toEqual('user');
	});

	test('should return password', () => {
		expect(getLoginPassword(state as StateSchema)).toEqual('123');
	});
});
