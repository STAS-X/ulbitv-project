import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { AppLinkProps, AppLink, AppLinkTheme } from './AppLink';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export default {
	title: 'shared/AppLink',
	component: AppLink,
	argTypes: {
		backgroundColor: { control: 'color' }
	},
	args: {
		to: '/'
	}
} as Meta<typeof AppLink>;

const Template: StoryFn<typeof AppLink> = (args: AppLinkProps) => <AppLink {...args} />;

export const AppLinkPrimary = Template.bind({});

AppLinkPrimary.args = {
	children: 'TestLink',
	theme: AppLinkTheme.PRIMARY
};

export const AppLinkSecondary = Template.bind({});

AppLinkSecondary.args = {
	children: 'TestLink',
	theme: AppLinkTheme.SECONDARY
};

export const AppLinkPrimaryDark = Template.bind({});

AppLinkPrimaryDark.args = {
	children: 'TestLink',
	theme: AppLinkTheme.PRIMARY
};
AppLinkPrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const AppLinkSecondaryDark = Template.bind({});

AppLinkSecondaryDark.args = {
	children: 'TestLink',
	theme: AppLinkTheme.SECONDARY
};
AppLinkSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
