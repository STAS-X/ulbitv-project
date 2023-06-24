import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ArticleDetailesCommentsProps, ArticleDetailesComments } from './ArticleDetailesComments';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
	title: 'shared/ArticleDetailesComments',
	component: ArticleDetailesComments,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof ArticleDetailesComments>;

const Template: StoryFn<typeof ArticleDetailesComments> = (args: ArticleDetailesCommentsProps) => (
	<ArticleDetailesComments {...args} />
);

export const ArticleDetailesCommentsPrimary = Template.bind({});
ArticleDetailesCommentsPrimary.args = {
	children: 'Text primary'
};

export const ArticleDetailesCommentsSecondary = Template.bind({});
ArticleDetailesCommentsSecondary.args = {
	children: 'Text secondary'
};

export const ArticleDetailesCommentsSecondaryDark = Template.bind({});
ArticleDetailesCommentsSecondaryDark.args = {
	children: 'Text secondary'
};
ArticleDetailesCommentsSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
