import { StoryFn } from '@storybook/react';
import RouterUtils from '@/shared/lib/hooks/useRouterUtils';

export const NavigateDecorator = (StoryComponent: StoryFn) => {
	return (
		<RouterUtils>
			<StoryComponent />
		</RouterUtils>
	);
};
