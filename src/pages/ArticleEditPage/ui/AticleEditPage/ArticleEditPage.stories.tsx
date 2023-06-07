import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import ArticleEditPage, { AticleEditPageProps } from './ArticleEditPage';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/AticleEditPage',
	component: ArticleEditPage,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof ArticleEditPage>;

const Template: StoryFn<typeof ArticleEditPage> = (args: AticleEditPageProps) => <ArticleEditPage {...args} />;

export const AticleEditPagePrimary = Template.bind({});
AticleEditPagePrimary.args = {
	children: 'Text primary'
};

export const AticleEditPageSecondary = Template.bind({});
AticleEditPageSecondary.args = {
	children: 'Text secondary'
};

export const AticleEditPageSecondaryDark = Template.bind({});
AticleEditPageSecondaryDark.args = {
	children: 'Text secondary'
};
AticleEditPageSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
