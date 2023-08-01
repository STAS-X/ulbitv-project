import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { MainLayoutProps, MainLayout } from './MainLayout';
import { ThemeDecorator } from '../../config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../const/theme';

export default {
	title: 'shared/MainLayout',
	component: MainLayout,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as Meta<typeof MainLayout>;

const Template: StoryFn<typeof MainLayout> = (args: MainLayoutProps) => (
	<MainLayout {...args} />
);

export const MainLayoutPrimary = Template.bind({});

export const MainLayoutSecondary = Template.bind({});

export const MainLayoutSecondaryDark = Template.bind({});

MainLayoutSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
