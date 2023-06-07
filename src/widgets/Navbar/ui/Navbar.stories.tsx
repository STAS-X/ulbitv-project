import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { Navbar, NavbarProps } from './Navbar';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'widget/Navbar',
	component: Navbar,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof Navbar>;

const Template: StoryFn<typeof Navbar> = (args: NavbarProps) => <Navbar {...args} />;

export const LightBar = Template.bind({});

LightBar.args = {};

export const DarkBar = Template.bind({});

DarkBar.args = {};

DarkBar.decorators = [ThemeDecorator(Theme.DARK)];
