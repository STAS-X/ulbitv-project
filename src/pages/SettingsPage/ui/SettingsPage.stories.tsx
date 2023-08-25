import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import SettingsPage from './SettingsPage';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
//import { getParamsForScreenShot } from 'shared/lib/storyShots/getParamsForShotStory';

export default {
	title: 'pages/SettingsPage',
	component: SettingsPage,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof SettingsPage>;

const Template: StoryFn<typeof SettingsPage> = (args: any) => <SettingsPage {...args} />;

export const SettingsPageNormal = Template.bind({});
SettingsPageNormal.args = {};
// MainPageNormal.story = {
// 	parameters: getParamsForScreenShot('div.app.light')
// };
SettingsPageNormal.decorators = [ThemeDecorator(Theme.LIGHT)];

export const SettingsPageDark = Template.bind({});
SettingsPageDark.args = {};
// MainPageDark.story = {
// 	parameters: getParamsForScreenShot('div.app.dark')
// };
SettingsPageDark.decorators = [ThemeDecorator(Theme.DARK)];
