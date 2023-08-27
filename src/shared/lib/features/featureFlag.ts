import { FEATURES_LS_KEY } from '../../const/localstorage';

export interface FeatureFlags {
	isFeatureRecommendation?: boolean;
	isFeatureRating?: boolean;
	isFeatureCounter?: boolean;
	isAppRedesigned?: boolean;
}

export const setInitFeatureFlags = (flags?: FeatureFlags): void => {
	if (flags) {
		//console.log(flags, 'get flags');
		//const prevValue = JSON.parse(localStorage.getItem(FEATURES_LS_KEY) ?? '{}');
		localStorage.setItem(FEATURES_LS_KEY, JSON.stringify({ /*...prevValue,*/ ...flags }));
	}
}

