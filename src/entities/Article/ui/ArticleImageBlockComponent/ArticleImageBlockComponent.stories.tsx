import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleImageBlockComponentProps, ArticleImageBlockComponent } from './ArticleImageBlockComponent';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/ArticleImageBlockComponent',
	component: ArticleImageBlockComponent,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as ComponentMeta<typeof ArticleImageBlockComponent>;

const Template: ComponentStory<typeof ArticleImageBlockComponent> = (args: ArticleImageBlockComponentProps) => (
	<ArticleImageBlockComponent {...args} />
);

export const ArticleImageBlockComponentPrimary = Template.bind({});
ArticleImageBlockComponentPrimary.args = {
	children: 'Text primary'
};

export const ArticleImageBlockComponentSecondary = Template.bind({});
ArticleImageBlockComponentSecondary.args = {
	children: 'Text secondary'
};

export const ArticleImageBlockComponentSecondaryDark = Template.bind({});
ArticleImageBlockComponentSecondaryDark.args = {
	children: 'Text secondary'
};
ArticleImageBlockComponentSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
