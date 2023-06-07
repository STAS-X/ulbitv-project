import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { VStackProps, VStack } from './VStack';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/VStack',
	component: VStack,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof VStack>;

const Template: StoryFn<typeof VStack> = (args: VStackProps) => <VStack {...args} />;

export const VStackPrimary = Template.bind({});
VStackPrimary.args = {
	children: 'Text primary',
	gap: 20
};

export const VStackSecondaryDark = Template.bind({});
VStackSecondaryDark.args = {
	children: 'Text secondary',
	gap: 50
};
VStackSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
