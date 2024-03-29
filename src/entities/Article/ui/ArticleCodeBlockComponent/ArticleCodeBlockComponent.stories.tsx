import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ArticleCodeBlockComponentProps, ArticleCodeBlockComponent } from './ArticleCodeBlockComponent';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { ArticleBlockType } from '../../model/types/articleSchema';

export default {
	title: 'shared/ArticleCodeBlockComponent',
	component: ArticleCodeBlockComponent,
	args: {
		block: {
			id: '4',
			type: ArticleBlockType.CODE,
			code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;'
		}
	}
} as Meta<typeof ArticleCodeBlockComponent>;

const Template: StoryFn<typeof ArticleCodeBlockComponent> = (args: ArticleCodeBlockComponentProps) => (
	<ArticleCodeBlockComponent {...args} />
);

export const ArticleCodeBlockComponentPrimary = Template.bind({});
ArticleCodeBlockComponentPrimary.args = {
	children: 'Text primary'
};

export const ArticleCodeBlockComponentDark = Template.bind({});
ArticleCodeBlockComponentDark.args = {
	children: 'Text secondary'
};
ArticleCodeBlockComponentDark.decorators = [ThemeDecorator(Theme.DARK)];
