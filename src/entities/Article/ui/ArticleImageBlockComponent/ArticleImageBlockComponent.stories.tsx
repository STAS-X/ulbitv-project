import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ArticleImageBlockComponentProps, ArticleImageBlockComponent } from './ArticleImageBlockComponent';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { ArticleBlockType } from '../../model/types/articleSchema';

export default {
	title: 'shared/ArticleImageBlockComponent',
	component: ArticleImageBlockComponent,
	args: {
		block: {
			id: '2',
			type: ArticleBlockType.IMAGE,
			src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
			title: 'Рисунок 1 - скриншот сайта'
		}
	}
} as Meta<typeof ArticleImageBlockComponent>;

const Template: StoryFn<typeof ArticleImageBlockComponent> = (args: ArticleImageBlockComponentProps) => (
	<ArticleImageBlockComponent {...args} />
);

export const ArticleImageBlockComponentPrimary = Template.bind({});
ArticleImageBlockComponentPrimary.args = {
	children: 'Text primary'
};

export const ArticleImageBlockComponentDark = Template.bind({});
ArticleImageBlockComponentDark.args = {
	children: 'Text secondary'
};
ArticleImageBlockComponentDark.decorators = [ThemeDecorator(Theme.DARK)];
