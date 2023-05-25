import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { InputProps, Input } from './Input';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/Input',
	component: Input,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args: InputProps) => <Input {...args} />;

export const InputPrimary = Template.bind({});
InputPrimary.args = {
	placeholder: 'light theme',
	value: 'test 1',
	ref: null
};

export const InputDark = Template.bind({});
InputDark.args = {
	placeholder: 'dark theme',
	value: 'test 2',
	ref: null
};
InputDark.decorators = [ThemeDecorator(Theme.DARK)];
