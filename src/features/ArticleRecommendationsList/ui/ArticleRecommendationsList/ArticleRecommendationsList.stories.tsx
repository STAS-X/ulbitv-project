import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleRecommendationsListProps, ArticleRecommendationsList } from './ArticleRecommendationsList';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'features/ArticleRecommendationsList',
	component: ArticleRecommendationsList
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args: ArticleRecommendationsListProps) => (
	<ArticleRecommendationsList {...args} />
);

export const ArticleRecommendationsListPrimary = Template.bind({});

export const ArticleRecommendationsListSecondaryDark = Template.bind({});

ArticleRecommendationsListSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
