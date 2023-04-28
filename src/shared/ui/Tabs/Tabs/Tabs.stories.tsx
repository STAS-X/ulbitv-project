import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TabsProps, Tabs } from './Tabs';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/Tabs',
	component: Tabs,
	args: {
		tabs: [
			{
				value: 'IT',
				content: 'content tab 1'
			},
			{
				value: 'SINCE',
				content: 'content tab 2'
			},
			{
				value: 'ECONOMICS',
				content: 'content tab 3'
			}
		]
	}
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args: TabsProps) => <Tabs {...args} />;

export const TabsNormal = Template.bind({});
TabsNormal.args = {};

export const TabsNormalDark = Template.bind({});
TabsNormalDark.args = {
	children: 'Text secondary'
};
TabsNormalDark.decorators = [ThemeDecorator(Theme.DARK)];
