import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { ForbiddenPage } from './ForbiddenPage';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider/lib/ThemeContext';
//import { getParamsForScreenShot } from 'shared/lib/storyShots/getParamsForShotStory';

export default {
	title: 'pages/ForbiddenPage',
	component: ForbiddenPage,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof ForbiddenPage>;

const Template: StoryFn<typeof ForbiddenPage> = (args: any) => <ForbiddenPage {...args} />;

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
