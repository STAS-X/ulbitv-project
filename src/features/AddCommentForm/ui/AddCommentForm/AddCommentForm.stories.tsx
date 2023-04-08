import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddCommentForm from './AddCommentForm';
import { AddCommentFormProps } from './AddCommentForm';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/AddCommentForm',
	component: AddCommentForm,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as ComponentMeta<typeof AddCommentForm>;

const Template: ComponentStory<typeof AddCommentForm> = (args: AddCommentFormProps) => <AddCommentForm {...args} />;

export const AddCommentFormPrimary = Template.bind({});
AddCommentFormPrimary.args = {
	children: 'Text primary'
};

export const AddCommentFormSecondary = Template.bind({});
AddCommentFormSecondary.args = {
	children: 'Text secondary'
};

export const AddCommentFormSecondaryDark = Template.bind({});
AddCommentFormSecondaryDark.args = {
	children: 'Text secondary'
};
AddCommentFormSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
