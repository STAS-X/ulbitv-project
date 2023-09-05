// eslint-disable-next-line stas-eslint-plugin/layer-imports
import { useFeaturesByKey } from '@/entities/User';
import { FEATURES_LS_KEY } from '../../const/localstorage';
import { FeatureFlags } from '../features/featureFlag';

export const useGetFeatureByKey = (flag: keyof FeatureFlags): boolean => {
	const featureFlagValue = useFeaturesByKey(flag);
	if (typeof featureFlagValue === 'boolean') return featureFlagValue;

	const featureFlags = localStorage.getItem(FEATURES_LS_KEY) ?? '{}';
	//console.log(JSON.parse(featureFlags), flag, (JSON.parse(featureFlags) as FeatureFlags)[flag], 'featureflag')
	if (featureFlags && JSON.parse(featureFlags)) {
		//console.log(JSON.parse(featureFlags)[flag], 'get flags data');
		return Boolean(JSON.parse(featureFlags)[flag]);
	}
	return false;
};
