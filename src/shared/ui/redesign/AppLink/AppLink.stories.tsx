import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { AppLinkProps, AppLink } from './AppLink';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export default {
	title: 'shared/redesigned/AppLink',
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
	variant: 'primary'
};

export const AppLinkSecondary = Template.bind({});

AppLinkSecondary.args = {
	children: 'TestLink',
	variant: 'red'
};

export const AppLinkPrimaryDark = Template.bind({});

AppLinkPrimaryDark.args = {
	children: 'TestLink',
	variant: 'primary'
};
AppLinkPrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const AppLinkSecondaryDark = Template.bind({});

AppLinkSecondaryDark.args = {
	children: 'TestLink',
	variant: 'red'
};
AppLinkSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
