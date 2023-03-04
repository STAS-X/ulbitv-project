import { Provider } from 'react-redux';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import { Story } from '@storybook/react';

export const StoreDecorator = (StoryComponent: Story) => {
	const store = createReduxStore();

	return <Provider store={store}>{<StoryComponent />}</Provider>;
};
