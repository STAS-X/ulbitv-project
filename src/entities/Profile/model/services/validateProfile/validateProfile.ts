import { ProfileData } from 'entities/Profile';
import { ValidateErrorType, ValidateProfileError } from '../../types/profileSchema';

export const validateProfileData = (profile: ProfileData) => {
	const { first, lastname, age = 0, city, username, avatar } = profile;
	const errors: ValidateErrorType = {};

	if (!first) {
		errors[ValidateProfileError.INCORRECT_USER_FIRST] = 'validation.first';
	}
	if (!lastname) {
		errors[ValidateProfileError.INCORRECT_USER_LAST] = 'validation.last';
	}

	if (age < 1 || age > 120) {
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
	return errors;
};

const checkAvatarUrl = (avatar: string) => {
	const urlPattern = /^https?:\/\/.*\/.*.(png|gif|webp|jpeg|jpg)??.*$/gim;
	const regex = new RegExp(urlPattern);
	return regex.test(avatar);
};
