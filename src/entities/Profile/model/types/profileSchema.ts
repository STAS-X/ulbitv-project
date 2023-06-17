import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

export enum ValidateProfileError {
	INCORRECT_USER_FIRST = 'INCORRECT_FIRST',
	INCORRECT_USER_LAST = 'INCORRECT_LAST',
	INCORRECT_AGE = 'INCORRECT_AGE',
	INCORRECT_CITY = 'INCORRECT_CITY',
	INCORRECT_USERNAME = 'INCORRECT_LOGIN',
	INCORRECT_AVATAR = 'INCORRECT_AVATAR',
	INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
	INCORRECT_CURRENCY = 'INCORRECT_CURRENCY'
}

export enum ProfileFieldType {
	FIRST = 'first',
	LAST = 'last',
	AGE = 'age',
	CITY = 'city',
	USERNAME = 'username',
	AVATAR = 'avatar',
	COUNTRY = 'country',
	CURRENCY = 'currency'
}

export type ValidateErrorType = Partial<Record<ValidateProfileError, string>>;

export interface ProfileData {
	id?: string;
	first?: string;
	lastname?: string;
	age?: number;
	currency?: Currency;
	country?: Country;
	city?: string;
	username?: string;
	avatar?: string;
}

export interface ProfileSchema {
	data?: ProfileData;
	formData?: ProfileData;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
	validateError?: ValidateErrorType;
}
