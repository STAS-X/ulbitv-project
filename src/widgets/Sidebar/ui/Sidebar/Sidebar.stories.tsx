import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { SideBar, SideBarProps } from './Sidebar';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
	title: 'widget/Sidebar',
	component: SideBar,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof SideBar>;

const Template: StoryFn<typeof SideBar> = (args: SideBarProps) => <SideBar {...args} />;

export const LightNoAuthBar = Template.bind({});

LightNoAuthBar.args = {};

LightNoAuthBar.decorators = [StoreDecorator({ user: { authData: undefined } })];

export const DarkAuthBar = Template.bind({});

DarkAuthBar.args = {};

DarkAuthBar.decorators = [
	ThemeDecorator(Theme.DARK),
	StoreDecorator({ user: { authData: { id: '1', profileId: '1', username: 'XXX' } } })
];
