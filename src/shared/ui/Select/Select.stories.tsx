import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { SelectProps, Select } from './Select';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/Select',
	component: Select,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = (args: SelectProps) => <Select {...args} />;

export const SelectPrimary = Template.bind({});
SelectPrimary.args = {
	placeholder: 'light theme',
	readonly: false,
	value: '123',
	options: [
		{ value: '123', description: '123' },
		{ value: '234', description: '12334' },
		{ value: '3234', description: '6543' },
		{ value: '546', description: '365' }
	]
};

export const SelectReadOnly = Template.bind({});
SelectReadOnly.args = {
	placeholder: 'light readonly',
	readonly: true,
	value: '234',
	options: [
		{ value: '123', description: '123' },
		{ value: '234', description: '12334' },
		{ value: '3234', description: '6543' },
		{ value: '546', description: '365' }
	]
};

export const SelectDark = Template.bind({});
SelectDark.args = {
	placeholder: 'dark theme',
	readonly: false,
	value: '345',
	options: [
		{ value: '123', description: '123' },
		{ value: '234', description: '12334' },
		{ value: '3234', description: '6543' },
		{ value: '546', description: '365' }
	]
};
SelectDark.decorators = [ThemeDecorator(Theme.DARK)];
