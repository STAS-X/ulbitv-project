import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ArticleDetailesPageHeaderProps, ArticleDetailesPageHeader } from './ArticleDetailesPageHeader';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
	title: 'pages/ArticleDetailes/ArticleDetailesPageHeader',
	component: ArticleDetailesPageHeader,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof ArticleDetailesPageHeader>;

const Template: StoryFn<typeof ArticleDetailesPageHeader> = (args: ArticleDetailesPageHeaderProps) => (
	<ArticleDetailesPageHeader {...args} />
);

export const ArticleDetailesPageHeaderPrimary = Template.bind({});
ArticleDetailesPageHeaderPrimary.args = {
	children: 'Text primary'
};

export const ArticleDetailesPageHeaderSecondary = Template.bind({});
ArticleDetailesPageHeaderSecondary.args = {
	children: 'Text secondary'
};

export const ArticleDetailesPageHeaderSecondaryDark = Template.bind({});
ArticleDetailesPageHeaderSecondaryDark.args = {
	children: 'Text secondary'
};
ArticleDetailesPageHeaderSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
