import { Story } from '@storybook/react';
import RouterUtils from '@/shared/lib/hooks/useRouterUtils';

export const NavigateDecorator = (StoryComponent: Story) => {
	return (
		<RouterUtils>
			<StoryComponent />
		</RouterUtils>
	);
};
