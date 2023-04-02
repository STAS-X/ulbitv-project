 

 import * as React from 'react';
 import { ComponentStory, ComponentMeta } from '@storybook/react';
 import { ArticleTextBlockComponentProps, ArticleTextBlockComponent } from './ArticleTextBlockComponent';
 import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
 import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

 export default {
		title: 'shared/ArticleTextBlockComponent',
		component: ArticleTextBlockComponent,
		argTypes: {
			backgroundColor: { control: 'color' }
		}
 } as ComponentMeta<typeof ArticleTextBlockComponent>;

 const Template: ComponentStory<typeof ArticleTextBlockComponent> = (args: ArticleTextBlockComponentProps) => (
		<ArticleTextBlockComponent {...args} />
 );

 export const ArticleTextBlockComponentPrimary = Template.bind({});
 ArticleTextBlockComponentPrimary.args = {
		children: 'Text primary'
 };

 export const ArticleTextBlockComponentSecondary = Template.bind({});
 ArticleTextBlockComponentSecondary.args = {
		children: 'Text secondary'
 };

 export const ArticleTextBlockComponentSecondaryDark = Template.bind({});
 ArticleTextBlockComponentSecondaryDark.args = {
		children: 'Text secondary'
 };
 ArticleTextBlockComponentSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
