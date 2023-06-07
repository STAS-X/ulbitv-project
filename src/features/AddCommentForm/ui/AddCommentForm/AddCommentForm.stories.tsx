import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AddCommentForm, { AddCommentFormProps } from './AddCommentForm';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'features/AddCommentForm',
	component: AddCommentForm,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof AddCommentForm>;

const Template: StoryFn<typeof AddCommentForm> = (args: AddCommentFormProps) => <AddCommentForm {...args} />;

export const AddCommentFormNormal = Template.bind({});
AddCommentFormNormal.args = {
	onSendComment: action('onSendComment')
};

export const AddCommentFormDark = Template.bind({});
AddCommentFormDark.args = {
	onSendComment: action('onSendComment')
};
AddCommentFormDark.decorators = [ThemeDecorator(Theme.DARK)];
