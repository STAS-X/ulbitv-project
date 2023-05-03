import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleDetailesPageHeaderProps, ArticleDetailesPageHeader } from './ArticleDetailesPageHeader';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/ArticleDetailesPageHeader',
	component: ArticleDetailesPageHeader,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as ComponentMeta<typeof ArticleDetailesPageHeader>;

const Template: ComponentStory<typeof ArticleDetailesPageHeader> = (args: ArticleDetailesPageHeaderProps) => (
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
