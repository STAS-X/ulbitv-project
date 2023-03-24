import { Currency } from 'entities/Currency/model/types/currency';
import { Country } from 'entities/Country/model/types/country';

export interface ProfileData {
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
}
