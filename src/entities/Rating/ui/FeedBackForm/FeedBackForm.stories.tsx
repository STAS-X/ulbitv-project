import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import FeedBackForm, { FeedBackFormProps } from './FeedBackForm';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
	title: 'entities/Rating/FeedBackForm',
	component: FeedBackForm,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof FeedBackForm>;

const Template: StoryFn<typeof FeedBackForm> = (args: FeedBackFormProps) => <FeedBackForm {...args} />;

export const FeedBackFormPrimary = Template.bind({});
FeedBackFormPrimary.args = {
	onSuccess: () => {
		console.log('i am opened');
	}
};

export const FeedBackFormWithError = Template.bind({});
FeedBackFormWithError.args = {
	onSuccess: () => {
		console.log('i am opened');
	}
};
FeedBackFormWithError.decorators = [
	StoreDecorator({ loginForm: { username: '', password: '', isLoading: false, error: 'Ошибка получения данных' } })
];

export const FeedBackFormLoading = Template.bind({});
FeedBackFormLoading.args = {
	onSuccess: () => {
		console.log('i am opened');
	}
};
FeedBackFormLoading.decorators = [
	StoreDecorator({ loginForm: { username: '', password: '', error: '', isLoading: true } })
];

export const FeedBackFormDark = Template.bind({});
FeedBackFormDark.args = {
	onSuccess: () => {
		console.log('i am opened');
	}
};
FeedBackFormDark.decorators = [ThemeDecorator(Theme.DARK)];
