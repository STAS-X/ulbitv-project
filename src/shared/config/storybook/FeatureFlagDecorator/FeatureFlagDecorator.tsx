import { StoryFn } from '@storybook/react';
import { FeatureFlags, setInitFeatureFlags } from '@/shared/lib/features/featureFlag';

export const FeatureFlagDecorator = (features: FeatureFlags) => (StoryComponent: StoryFn) => {
	setInitFeatureFlags(features);

	return <StoryComponent />;
};
