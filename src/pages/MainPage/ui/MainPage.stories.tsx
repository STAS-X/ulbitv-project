import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MainPage from './MainPage';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { getParamsForScreenShot } from 'shared/lib/storyShots/getParamsForShotStory';

export default {
	title: 'pages/MainPage',
	component: MainPage,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = (args: any) => <MainPage {...args} />;

export const MainPageNormal = Template.bind({});
MainPageNormal.args = {};
MainPageNormal.story = {
	parameters: getParamsForScreenShot('div.app.light')
};
MainPageNormal.decorators = [ThemeDecorator(Theme.LIGHT)];

export const MainPageDark = Template.bind({});
MainPageDark.args = {};
MainPageDark.story = {
	parameters: getParamsForScreenShot('div.app.dark')
};
MainPageDark.decorators = [ThemeDecorator(Theme.DARK)];
