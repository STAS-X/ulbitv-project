import { FC, ReactElement } from 'react';
import { FeatureFlags, getFeatureFlag } from './featureFlag';

interface ToggleFeatureProps {
	feature: keyof FeatureFlags;
	on: ReactElement;
	off: ReactElement;
}

export const ToggleFeatures = (props: ToggleFeatureProps) => {
	const { on, off, feature } = props;
	//console.log(getFeatureFlag(feature), feature, 'get feature flag');
	if (getFeatureFlag(feature)) {
		return on;
	}
	return off;
};

export const toggleFeatures: ReactElement | FC<any> = (props: ToggleFeatureProps)  => {
	const { on, off, feature } = props;
	//console.log(getFeatureFlag(feature), feature, 'get feature flag');
	if (getFeatureFlag(feature)) {
		return on;
	}
	return off;
};
