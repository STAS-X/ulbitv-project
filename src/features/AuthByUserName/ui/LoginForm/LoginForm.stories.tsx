import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LoginFormProps, LoginForm } from './LoginForm';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'features/LoginForm',
	component: LoginForm,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args: LoginFormProps) => <LoginForm {...args} />;

export const LoginFormPrimary = Template.bind({});
LoginFormPrimary.args = {
	isOpen: true,
	onAuth: () => {
		console.log('i am opened');
	}
};

export const LoginFormDark = Template.bind({});
LoginFormDark.args = {
	isOpen: true,
	onAuth: () => {
		console.log('i am opened');
	}
};
LoginFormDark.decorators = [ThemeDecorator(Theme.DARK)];
