import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HStackProps, HStack } from './HStack';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/HStack',
	component: HStack,
	args: {
		children: (
			<>
				<div>First</div>
				<div>Second</div>
				<div>Third</div>
				<div>Four</div>
				<div>Five</div>
			</>
		),
		justify: 'start',
		align: 'center',
		direction: 'row'
	}
} as ComponentMeta<typeof HStack>;

const Template: ComponentStory<typeof HStack> = (args: HStackProps) => <HStack {...args} />;

export const HStackPrimary = Template.bind({});
HStackPrimary.args = {
	children: 'Text primary',
	gap: 20
};

export const HStackSecondaryDark = Template.bind({});
HStackSecondaryDark.args = {
	children: 'Text secondary',
	gap: 50
};
HStackSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
