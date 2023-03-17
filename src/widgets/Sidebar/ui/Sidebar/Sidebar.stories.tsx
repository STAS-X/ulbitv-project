import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Sidebar, SidebarProps } from './Sidebar';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'widget/Sidebar',
	component: Sidebar,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args: SidebarProps) => <Sidebar {...args} />;

export const LightBar = Template.bind({});

LightBar.args = {};

export const DarkBar = Template.bind({});

DarkBar.args = {};

DarkBar.decorators = [ThemeDecorator(Theme.DARK)];
