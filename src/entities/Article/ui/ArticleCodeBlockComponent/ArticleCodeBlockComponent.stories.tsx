import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleCodeBlockComponentProps, ArticleCodeBlockComponent } from './ArticleCodeBlockComponent';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/ArticleCodeBlockComponent',
	component: ArticleCodeBlockComponent,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ArticleCodeBlockComponent>;

const Template: ComponentStory<typeof ArticleCodeBlockComponent> = (args: ArticleCodeBlockComponentProps) => (
	<ArticleCodeBlockComponent {...args} />
);

export const ArticleCodeBlockComponentPrimary = Template.bind({});
ArticleCodeBlockComponentPrimary.args = {
	children: 'Text primary',
};

export const ArticleCodeBlockComponentSecondary = Template.bind({});
ArticleCodeBlockComponentSecondary.args = {
	children: 'Text secondary',
};

export const ArticleCodeBlockComponentSecondaryDark = Template.bind({});
ArticleCodeBlockComponentSecondaryDark.args = {
	children: 'Text secondary',
};
ArticleCodeBlockComponentSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
