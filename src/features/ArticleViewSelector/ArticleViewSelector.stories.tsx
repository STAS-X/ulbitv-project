import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleViewSelectorProps, ArticleViewSelector } from './ArticleViewSelector';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/ArticleViewSelector',
	component: ArticleViewSelector,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as ComponentMeta<typeof ArticleViewSelector>;

const Template: ComponentStory<typeof ArticleViewSelector> = (args: ArticleViewSelectorProps) => (
	<ArticleViewSelector {...args} />
);

export const ArticleViewSelectorPrimary = Template.bind({});
ArticleViewSelectorPrimary.args = {
	children: 'Text primary',
	theme: 'Primary'
};

export const ArticleViewSelectorSecondary = Template.bind({});
ArticleViewSelectorSecondary.args = {
	children: 'Text secondary',
	theme: 'Secondary'
};

export const ArticleViewSelectorSecondaryDark = Template.bind({});
ArticleViewSelectorSecondaryDark.args = {
	children: 'Text secondary',
	theme: 'Secondary'
};
ArticleViewSelectorSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
