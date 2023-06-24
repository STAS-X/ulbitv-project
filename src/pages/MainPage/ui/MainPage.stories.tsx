import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import MainPage from './MainPage';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
//import { getParamsForScreenShot } from 'shared/lib/storyShots/getParamsForShotStory';

export default {
	title: 'pages/MainPage',
	component: MainPage,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof MainPage>;

const Template: StoryFn<typeof MainPage> = (args: any) => <MainPage {...args} />;

export const MainPageNormal = Template.bind({});
MainPageNormal.args = {};
// MainPageNormal.story = {
// 	parameters: getParamsForScreenShot('div.app.light')
// };
MainPageNormal.decorators = [ThemeDecorator(Theme.LIGHT)];

export const MainPageDark = Template.bind({});
MainPageDark.args = {};
// MainPageDark.story = {
// 	parameters: getParamsForScreenShot('div.app.dark')
// };
MainPageDark.decorators = [ThemeDecorator(Theme.DARK)];
