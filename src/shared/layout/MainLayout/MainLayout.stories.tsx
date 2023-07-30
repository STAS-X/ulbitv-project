import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainLayoutProps, MainLayout } from './MainLayout';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/MainLayout',
	component: MainLayout,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof MainLayout>;

const Template: ComponentStory<typeof MainLayout> = (args: MainLayoutProps) => (
	<MainLayout {...args} />
);

export const MainLayoutPrimary = Template.bind({});
MainLayoutPrimary.args = {
	children: 'Text primary',
	theme: 'Primary',
};

export const MainLayoutSecondary = Template.bind({});
MainLayoutSecondary.args = {
	children: 'Text secondary',
	theme: 'Secondary',
};

export const MainLayoutSecondaryDark = Template.bind({});
MainLayoutSecondaryDark.args = {
	children: 'Text secondary',
	theme: 'Secondary',
};
MainLayoutSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
