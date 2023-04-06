import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CommentCardProps, CommentCard } from './CommentCard';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/CommentCard',
	component: CommentCard,
	args: {
		isLoading: false,
		comment: { id: '1', text: 'Some text for comment', user: { id: '1', username: 'UserName' } }
	}
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args: CommentCardProps) => <CommentCard {...args} />;

export const CommentCardPrimary = Template.bind({});
CommentCardPrimary.args = {
	children: 'Text primary'
};

export const CommentCardLoadingDark = Template.bind({});
CommentCardLoadingDark.args = {
	children: 'Text secondary',
	isLoading: true
};
CommentCardLoadingDark.decorators = [ThemeDecorator(Theme.DARK)];

export const CommentCardDark = Template.bind({});
CommentCardDark.args = {
	children: 'Text secondary'
};
CommentCardDark.decorators = [ThemeDecorator(Theme.DARK)];
