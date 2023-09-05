import { FC, ReactElement } from 'react';
import { FeatureFlags } from './featureFlag';
import {useGetFeatureByKey} from '../hooks/useFeatures';

interface ToggleFeatureProps {
	feature: keyof FeatureFlags;
	on: ReactElement;
	off: ReactElement;
}

export const ToggleFeatures = (props: ToggleFeatureProps) => {
	const { on, off, feature } = props;

	const featureFlagValue = useGetFeatureByKey(feature);
	console.log(featureFlagValue, feature, 'get feature flag');
	if (featureFlagValue) {
		return on;
	}
	return off;
};

export const toggleFeatures: ReactElement | FC<any> = (props: ToggleFeatureProps)  => {
	const { on, off, feature } = props;

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const featureFlagValue = useGetFeatureByKey(feature);
	//console.log(featureFlagValue, feature, 'get feature flag');
	if (featureFlagValue) {
		return on;
	}
	return off;
};
