import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProfilePage, { ProfilePageProps } from './ProfilePage';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'pages/ProfilePage',
	component: ProfilePage,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args: ProfilePageProps) => <ProfilePage {...args} />;

export const ProfilePagePrimary = Template.bind({});
ProfilePagePrimary.args = {
	children: 'Text primary',
	theme: 'Primary'
};

export const ProfilePageSecondary = Template.bind({});
ProfilePageSecondary.args = {
	children: 'Text secondary',
	theme: 'Secondary'
};

export const ProfilePageSecondaryDark = Template.bind({});
ProfilePageSecondaryDark.args = {
	children: 'Text secondary',
	theme: 'Secondary'
};
ProfilePageSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
