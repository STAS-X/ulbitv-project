import { ValidateProfileError } from '@/entities/Profile';
import { Country } from '@/entities/Country/model/types/country';
import { Currency } from '@/entities/Currency/model/types/currency';
import { validateEditableProfileData } from './validateEditableProfile';

const profileValue = {
	first: 'Станислав',
	lastname: '-XXX-',
	age: 32,
	currency: Currency.RUB,
	country: Country.Russia,
	city: 'Moscow',
	username: 'admin',
	avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg'
};

describe('validateProfile.test', () => {
	test('should return success', () => {
		const result = validateEditableProfileData(profileValue);
		expect(result).toEqual(undefined);
	});
	test('should return validate AGE and AVATAR error', () => {
		const result = validateEditableProfileData({ ...profileValue, age: 320, avatar: 'picture.png' });
		expect(result).toEqual({
			[ValidateProfileError.INCORRECT_AGE]: 'validation.age',
			[ValidateProfileError.INCORRECT_AVATAR]: 'validation.avatar'
		});
	});

	test('should return missing COUNTRY error', () => {
		delete (profileValue as any).country;
		const result = validateEditableProfileData(profileValue);
		expect(result).toEqual({
			[ValidateProfileError.INCORRECT_COUNTRY]: 'validation.country'
		});
	});
});
