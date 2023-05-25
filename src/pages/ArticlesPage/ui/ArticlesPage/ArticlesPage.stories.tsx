import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import ArticlesPage, { ArticlesPageProps } from './ArticlesPage';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'pages/ArticlesPage',
	component: ArticlesPage
} as Meta<typeof ArticlesPage>;

const Template: StoryFn<typeof ArticlesPage> = (args: ArticlesPageProps) => <ArticlesPage {...args} />;

export const ArticlesPagePrimary = Template.bind({});

export const ArticlesPageSecondary = Template.bind({});

export const ArticlesPageSecondaryDark = Template.bind({});

ArticlesPageSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
