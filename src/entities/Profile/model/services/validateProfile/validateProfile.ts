import { ProfileData } from '../../../';
import { ValidateErrorType, ValidateProfileError } from '../../types/profileSchema';

export const validateProfileData = (profile: ProfileData) => {
	const { first, lastname, age, city, country, currency, username, avatar } = profile;
	const errors: ValidateErrorType = {};

	if (!first) {
		errors[ValidateProfileError.INCORRECT_USER_FIRST] = 'validation.first';
	}
	if (!lastname) {
		errors[ValidateProfileError.INCORRECT_USER_LAST] = 'validation.last';
	}

	if (
		!age ||
		age.toString()[0] === '0' ||
		Number.isNaN(age) ||
		!Number.isInteger(Number(age)) ||
		age < 5 ||
		age > 149
	) {
		errors[ValidateProfileError.INCORRECT_AGE] = 'validation.age';
	}

	if (!city) {
		errors[ValidateProfileError.INCORRECT_CITY] = 'validation.city';
	}

	if (!username) {
		errors[ValidateProfileError.INCORRECT_USERNAME] = 'validation.username';
	}
	if (!avatar || !checkAvatarUrl(avatar)) {
		errors[ValidateProfileError.INCORRECT_AVATAR] = 'validation.avatar';
	}

	if (!country) {
		errors[ValidateProfileError.INCORRECT_COUNTRY] = 'validation.country';
	}

	if (!currency) {
		errors[ValidateProfileError.INCORRECT_CURRENCY] = 'validation.currency';
	}

	return Object.keys(errors).length ? errors : undefined;
};

const checkAvatarUrl = (avatar: string) => {
	const urlPattern = /^https?:\/\/.*\/.*.(png|gif|webp|jpeg|jpg)??.*$/gim;
	const regex = new RegExp(urlPattern);
	return regex.test(avatar);
};
