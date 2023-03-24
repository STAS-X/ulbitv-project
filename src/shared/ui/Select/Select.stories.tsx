import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SelectProps, Select } from './Select';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/Select',
	component: Select,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args: SelectProps) => <Select {...args} />;

export const SelectPrimary = Template.bind({});
SelectPrimary.args = {
	placeholder: 'light theme',
	readonly: false,
	value: '123',
	options: ['123', '234', '3454', '456']
};

export const SelectReadOnly = Template.bind({});
SelectReadOnly.args = {
	placeholder: 'light readonly',
	readonly: true,
	value: '234',
	options: ['123', '234', '3454', '456']
};

export const SelectDark = Template.bind({});
SelectDark.args = {
	placeholder: 'dark theme',
	readonly: false,
	value: '345',
	options: ['121', '345', '454', '789']
};
SelectDark.decorators = [ThemeDecorator(Theme.DARK)];
