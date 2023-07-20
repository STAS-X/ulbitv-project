import { FEATURES_LS_KEY } from "../../const/localstorage";

export interface FeatureFlags {
	isFeatureRecommendation?: boolean;
	isFeatureRating?: boolean;
	isFeatureCounter?: boolean;
}

export const setInitFeatureFlags = (flags?: FeatureFlags): void => {
	if (flags) localStorage.setItem(FEATURES_LS_KEY, JSON.stringify(flags));
}

export const getFeatureFlag = (flag: keyof FeatureFlags): boolean => {
	const featureFlags = localStorage.getItem(FEATURES_LS_KEY);
	if (featureFlags && JSON.parse(featureFlags)) {
		return Boolean(JSON.parse(featureFlags)[flag]);
	}
	return false
}