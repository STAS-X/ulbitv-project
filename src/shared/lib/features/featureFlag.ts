import { FEATURES_LS_KEY } from '../../const/localstorage';

export interface FeatureFlags {
	isFeatureRecommendation?: boolean;
	isFeatureRating?: boolean;
	isFeatureCounter?: boolean;
}

export const setInitFeatureFlags = (flags?: FeatureFlags): void => {
	if (flags) {
		console.log(flags, 'get flags');
		const prevValue = JSON.parse(localStorage.getItem(FEATURES_LS_KEY) ?? '{}');
		localStorage.setItem(FEATURES_LS_KEY, JSON.stringify({ ...prevValue, ...flags }));
	}
}

export const getFeatureFlag = (flag: keyof FeatureFlags): boolean => {
	const featureFlags = localStorage.getItem(FEATURES_LS_KEY);
	if (featureFlags && JSON.parse(featureFlags)) {
		console.log(JSON.parse(featureFlags)[flag],'get data');
		return Boolean(JSON.parse(featureFlags)[flag]);
	}
	return false
}