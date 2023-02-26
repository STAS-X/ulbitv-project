import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AboutPage from './AboutPage';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { getParamsForScreenShot } from 'shared/lib/storyShots/getParamsForShotStory';

export default {
	title: 'pages/AboutPage',
	component: AboutPage,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = (args: any) => (
	<AboutPage {...args} />
);



export const AboutPageNormal = Template.bind({});
AboutPageNormal.args = {};
AboutPageNormal.story = {
	parameters: getParamsForScreenShot('div.app.light')
};

AboutPageNormal.decorators = [ThemeDecorator(Theme.LIGHT)];

export const AboutPageDark = Template.bind({});
AboutPageDark.args = {};
AboutPageDark.story = {
	parameters: getParamsForScreenShot('div.app.dark'),
};
AboutPageDark.decorators = [ThemeDecorator(Theme.DARK)];
