import { ReactElement } from 'react';
import { FeatureFlags, getFeatureFlag } from './featureFlag';

interface ToggleFeatureProps {
	feature: keyof FeatureFlags;
	on: ReactElement;
	off: ReactElement;
}

export const ToggleFeatures = (props: ToggleFeatureProps) => {
	const { on, off, feature } = props;

	if (getFeatureFlag(feature)) {
		return on;
	}
	return off;
};
