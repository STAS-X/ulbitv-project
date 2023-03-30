import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Sidebar, SidebarProps } from './Sidebar';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
	title: 'widget/Sidebar',
	component: Sidebar,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args: SidebarProps) => <Sidebar {...args} />;

export const LightNoAuthBar = Template.bind({});

LightNoAuthBar.args = {};

LightNoAuthBar.decorators = [StoreDecorator({ user: { authData: undefined } })];

export const DarkAuthBar = Template.bind({});

DarkAuthBar.args = {};

DarkAuthBar.decorators = [
	ThemeDecorator(Theme.DARK),
	StoreDecorator({ user: { authData: { id: '1', username: 'XXX', password: 'XYZ' } } })
];
