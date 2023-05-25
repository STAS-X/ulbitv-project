import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { NotFoundPage } from './NotFoundPage';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
//import { getParamsForScreenShot } from 'shared/lib/storyShots/getParamsForShotStory';

export default {
	title: 'pages/NoFoundPage',
	component: NotFoundPage,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof NotFoundPage>;

const Template: StoryFn<typeof NotFoundPage> = (args: any) => <NotFoundPage {...args} />;

export const NoFoundPageNormal = Template.bind({});
NoFoundPageNormal.args = {};
// NoFoundPageNormal.story = {
// 	parameters: getParamsForScreenShot('div.app.light')
// };

export const NoFoundPageDark = Template.bind({});
NoFoundPageDark.args = {};
// NoFoundPageDark.story = {
// 	parameters: getParamsForScreenShot('div.app.dark')
// };
NoFoundPageDark.decorators = [ThemeDecorator(Theme.DARK)];
