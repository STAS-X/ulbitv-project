import { ValidateProfileError } from 'entities/Profile/model/types/profileSchema';
import { Country } from 'entities/Country/model/types/country';
import { Currency } from 'entities/Currency/model/types/currency';
import { validateProfileData } from './validateProfile';

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
		const result = validateProfileData(profileValue);
		expect(result).toEqual(undefined);
	});
	test('should return validate AGE and AVATAR error', () => {
		const result = validateProfileData({ ...profileValue, age: 320, avatar: 'picture.png' });
		expect(result).toEqual({
			[ValidateProfileError.INCORRECT_AGE]: 'validation.age',
			[ValidateProfileError.INCORRECT_AVATAR]: 'validation.avatar'
		});
	});

	test('should return missing COUNTRY error', () => {
		delete (profileValue as any).country;
		const result = validateProfileData(profileValue);
		expect(result).toEqual({
			[ValidateProfileError.INCORRECT_COUNTRY]: 'validation.country'
		});
	});
});
