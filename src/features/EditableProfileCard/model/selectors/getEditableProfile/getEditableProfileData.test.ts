import { Currency } from '@/entities/Currency/model/types/currency';
import { Country } from '@/entities/Country/model/types/country';
import {
	getEditableProfileData,
	getEditableProfileIsLoading,
	getEditableProfileError,
	getEditableProfileReadOnly,
	getEditableProfileFormData
} from '../../..';
import { StateSchema } from '@/app/providers/StoreProvider';

const profileData = {
	username: 'admin',
	avatar: 'avatar.jpg',
	age: 26,
	country: Country.Ukraine,
	lastname: 'SUB',
	first: '-XXX-',
	city: 'Moskow',
	currency: Currency.USD
};

const profileOptions = {
	isLoading: true,
	readonly: true,
	error: undefined
};

describe('getProfileData', () => {
	test('should return profile data', () => {
		const state: DeepPartial<StateSchema> = {
			profile: { data: profileData }
		};
		expect(getEditableProfileData(state as StateSchema)).toEqual(profileData);
	});
	test('should return profile form data', () => {
		const state: DeepPartial<StateSchema> = {
			profile: { formData: profileData }
		};
		expect(getEditableProfileFormData(state as StateSchema)).toEqual(profileData);
	});

	test('should return loading status', () => {
		const state: DeepPartial<StateSchema> = {
			profile: { ...profileOptions }
		};
		expect(getEditableProfileIsLoading(state as StateSchema)).toEqual(true);
	});

	test('should return readonly', () => {
		const state: DeepPartial<StateSchema> = {
			profile: { ...profileOptions }
		};
		expect(getEditableProfileReadOnly(state as StateSchema)).toEqual(true);
	});

	test('should return error message', () => {
		const state: DeepPartial<StateSchema> = {
			profile: { ...profileOptions }
		};
		expect(getEditableProfileError(state as StateSchema)).toEqual(undefined);
	});
});
