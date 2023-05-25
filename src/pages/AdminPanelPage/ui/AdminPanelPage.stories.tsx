import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import AdminPanelPage from './AdminPanelPage';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
//import { getParamsForScreenShot } from 'shared/lib/storyShots/getParamsForShotStory';

export default {
	title: 'pages/AdminPanelPage',
	component: AdminPanelPage,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof AdminPanelPage>;

const Template: StoryFn<typeof AdminPanelPage> = (args: any) => <AdminPanelPage {...args} />;

export const AdminPanelPageNormal = Template.bind({});
AdminPanelPageNormal.args = {};
// AdminPanelPageNormal.story = {
// 	parameters: getParamsForScreenShot('div.app.light')
// };

AdminPanelPageNormal.decorators = [ThemeDecorator(Theme.LIGHT)];

export const AdminPanelPageDark = Template.bind({});
AdminPanelPageDark.args = {};
// AdminPanelPageDark.story = {
// 	parameters: getParamsForScreenShot('div.app.dark')
// };
AdminPanelPageDark.decorators = [ThemeDecorator(Theme.DARK)];
