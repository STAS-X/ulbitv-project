import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { CommentCardProps, CommentCard } from './CommentCard';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
	title: 'entities/Comment/CommentCard',
	component: CommentCard,
	args: {
		comment: { id: '1', text: 'Some text for comment', user: { id: '1', username: 'UserName' } }
	}
} as Meta<typeof CommentCard>;

const Template: StoryFn<typeof CommentCard> = (args: CommentCardProps) => <CommentCard {...args} />;

export const CommentCardPrimary = Template.bind({});
CommentCardPrimary.args = {
	children: 'Text primary'
};

export const CommentCardDark = Template.bind({});
CommentCardDark.args = {
	children: 'Text secondary'
};
CommentCardDark.decorators = [ThemeDecorator(Theme.DARK)];
