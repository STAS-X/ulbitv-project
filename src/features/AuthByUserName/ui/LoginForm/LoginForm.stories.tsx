import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import LoginForm, { LoginFormProps } from './LoginForm';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider/lib/ThemeContext';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
	title: 'features/LoginForm',
	component: LoginForm,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof LoginForm>;

const Template: StoryFn<typeof LoginForm> = (args: LoginFormProps) => <LoginForm {...args} />;

export const LoginFormPrimary = Template.bind({});
LoginFormPrimary.args = {
	isOpen: true,
	onSuccess: () => {
		console.log('i am opened');
	}
};

export const LoginFormWithError = Template.bind({});
LoginFormWithError.args = {
	isOpen: true,
	onSuccess: () => {
		console.log('i am opened');
	}
};
LoginFormWithError.decorators = [
	StoreDecorator({ loginForm: { username: '', password: '', isLoading: false, error: 'Ошибка получения данных' } })
];

export const LoginFormLoading = Template.bind({});
LoginFormLoading.args = {
	isOpen: true,
	onSuccess: () => {
		console.log('i am opened');
	}
};
LoginFormLoading.decorators = [
	StoreDecorator({ loginForm: { username: '', password: '', error: '', isLoading: true } })
];

export const LoginFormDark = Template.bind({});
LoginFormDark.args = {
	isOpen: true,
	onSuccess: () => {
		console.log('i am opened');
	}
};
LoginFormDark.decorators = [ThemeDecorator(Theme.DARK)];
