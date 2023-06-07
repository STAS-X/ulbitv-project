import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { CommentListProps, CommentList } from './CommentList';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'entities/Comment/CommentList',
	component: CommentList,
	args: {
		isLoading: false,
		comments: [
			{
				id: '4',
				text: 'some comment four',
				user: { username: 'User1', avatar: '' }
			},
			{
				id: '5',
				text: 'some comment five',
				user: { username: 'User2', avatar: '' }
			}
		]
	}
} as Meta<typeof CommentList>;

const Template: StoryFn<typeof CommentList> = (args: CommentListProps) => <CommentList {...args} />;

export const CommentListPrimary = Template.bind({});
CommentListPrimary.args = {
	children: 'Text primary'
};

export const CommentListLoading = Template.bind({});
CommentListLoading.args = {
	children: 'Text secondary',
	isLoading: true
};

export const CommentListDark = Template.bind({});
CommentListDark.args = {
	children: 'Text secondary'
};
CommentListDark.decorators = [ThemeDecorator(Theme.DARK)];
