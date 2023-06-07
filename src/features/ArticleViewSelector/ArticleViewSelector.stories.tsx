import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ArticleViewSelectorProps, ArticleViewSelector } from './ArticleViewSelector';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'features/ArticleViewSelector',
	component: ArticleViewSelector,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof ArticleViewSelector>;

const Template: StoryFn<typeof ArticleViewSelector> = (args: ArticleViewSelectorProps) => (
	<ArticleViewSelector {...args} />
);

export const ArticleViewSelectorPrimary = Template.bind({});
ArticleViewSelectorPrimary.args = {
	children: 'Text primary'
};

export const ArticleViewSelectorSecondary = Template.bind({});
ArticleViewSelectorSecondary.args = {
	children: 'Text secondary'
};

export const ArticleViewSelectorSecondaryDark = Template.bind({});
ArticleViewSelectorSecondaryDark.args = {
	children: 'Text secondary'
};

ArticleViewSelectorSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
