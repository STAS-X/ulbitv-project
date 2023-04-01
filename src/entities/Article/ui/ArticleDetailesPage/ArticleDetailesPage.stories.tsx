import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ArticleDetailesPage, { ArticleDetailesPageProps } from './ArticleDetailesPage';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/ArticleDetailesPage',
	component: ArticleDetailesPage,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as ComponentMeta<typeof ArticleDetailesPage>;

const Template: ComponentStory<typeof ArticleDetailesPage> = (args: ArticleDetailesPageProps) => (
	<ArticleDetailesPage {...args} />
);

export const ArticleDetailesPagePrimary = Template.bind({});
ArticleDetailesPagePrimary.args = {
	children: 'Text primary'
};

export const ArticleDetailesPageSecondary = Template.bind({});
ArticleDetailesPageSecondary.args = {
	children: 'Text secondary'
};

export const ArticleDetailesPageSecondaryDark = Template.bind({});
ArticleDetailesPageSecondaryDark.args = {
	children: 'Text secondary'
};
ArticleDetailesPageSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
