import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FlexProps, Flex } from './Flex';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/Flex',
	component: Flex,
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
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args: FlexProps) => <Flex {...args} />;

export const FlexRow = Template.bind({});

export const FlexColumn = Template.bind({});
FlexColumn.args = {
	direction: 'column',
	gap: 20
};

export const FlexEndDark = Template.bind({});
FlexEndDark.args = {
	align: 'end',
	gap: 50
};
FlexEndDark.decorators = [ThemeDecorator(Theme.DARK)];
