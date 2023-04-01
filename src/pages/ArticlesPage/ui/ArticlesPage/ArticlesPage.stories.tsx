import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticlesPageProps, ArticlesPage } from './ArticlesPage';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/ArticlesPage',
	component: ArticlesPage,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = (args: ArticlesPageProps) => <ArticlesPage {...args} />;

export const ArticlesPagePrimary = Template.bind({});
ArticlesPagePrimary.args = {
	children: 'Text primary'
};

export const ArticlesPageSecondary = Template.bind({});
ArticlesPageSecondary.args = {
	children: 'Text secondary'
};

export const ArticlesPageSecondaryDark = Template.bind({});
ArticlesPageSecondaryDark.args = {
	children: 'Text secondary'
};
ArticlesPageSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
