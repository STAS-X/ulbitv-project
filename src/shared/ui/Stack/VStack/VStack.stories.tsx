import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VStackProps, VStack } from './VStack';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/VStack',
	component: VStack,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as ComponentMeta<typeof VStack>;

const Template: ComponentStory<typeof VStack> = (args: VStackProps) => <VStack {...args} />;

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
