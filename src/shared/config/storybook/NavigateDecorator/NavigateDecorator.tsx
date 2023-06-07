import { Story } from '@storybook/react';
import RouterUtils from '@/app/providers/RouterUtilsProvider/RouterUtilsProvider';

export const NavigateDecorator = (StoryComponent: Story) => {
	return (
		<RouterUtils>
			<StoryComponent />
		</RouterUtils>
	);
};
