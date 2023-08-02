import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { TabsProps, Tabs } from './Tabs';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

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
} as Meta<typeof Tabs>;

const Template: StoryFn<typeof Tabs> = (args: TabsProps) => <Tabs {...args} />;

export const TabsNormal = Template.bind({});
TabsNormal.args = {};

export const TabsNormalDark = Template.bind({});
TabsNormalDark.args = {
	children: 'Text secondary'
};
TabsNormalDark.decorators = [ThemeDecorator(Theme.DARK)];
