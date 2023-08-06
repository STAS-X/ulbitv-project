import { FC, ReactElement } from 'react';
import { FeatureFlags, getFeatureFlag } from './featureFlag';

interface ToggleFeatureProps {
	feature: keyof FeatureFlags;
	on: ReactElement;
	off: ReactElement;
}

export const ToggleFeatures: FC<ToggleFeatureProps> = (props: ToggleFeatureProps) => {
	const { on, off, feature } = props;
	//console.log(getFeatureFlag(feature), feature, 'get feature flag');
	if (getFeatureFlag(feature)) {
		return on;
	}
	return off;
};
