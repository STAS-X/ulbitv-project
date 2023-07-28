import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ArticlePageGreetingProps, ArticlePageGreeting } from './ArticlePageGreeting';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
	title: 'features/ArticlePageGreeting',
	component: ArticlePageGreeting,
	args: {
		
	},
} as Meta<typeof ArticlePageGreeting>;

const Template: StoryFn<typeof ArticlePageGreeting> = (args: ArticlePageGreetingProps) => (
	<ArticlePageGreeting {...args} />
);

export const ArticlePageGreetingPrimary = Template.bind({});
ArticlePageGreetingPrimary.args = {
	children: 'Text primary',
};

export const ArticlePageGreetingSecondaryDark = Template.bind({});
ArticlePageGreetingSecondaryDark.args = {
	children: 'Text secondary',
};
ArticlePageGreetingSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
