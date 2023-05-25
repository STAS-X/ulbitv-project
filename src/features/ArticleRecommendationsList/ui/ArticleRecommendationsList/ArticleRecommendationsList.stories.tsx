import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ArticleRecommendationsListProps, ArticleRecommendationsList } from './ArticleRecommendationsList';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

const article = {
	id: '1',
	title: 'Article by id 1',
	subtitle: 'mock data',
	img: '',
	createdAt: '2022-02-02',
	views: '2000',
	type: [],
	blocks: [],
	user: { id: '1', username: 'stas-x' }
};

const generateParameters = (title: string) => {
	return {
		mockAddonConfigs: {
			globalMockData: [
				{
					url: `${_BASE_URL_}/articles?_limit=5`,
					method: 'GET',
					status: '200',
					response: (request: any) => {
						const {
							searchParams: { _limit: limit }
						} = request;

						return Array.from({ length: limit }, (_, id) => {
							return { ...article, id, title: `${title} ${id + 1}` ?? article.title };
						});
					}
				}
			]
		}
	};
};

export default {
	title: 'features/ArticleRecommendationsList',
	component: ArticleRecommendationsList
} as Meta<typeof ArticleRecommendationsList>;

const Template: StoryFn<typeof ArticleRecommendationsList> = (args: ArticleRecommendationsListProps) => (
	<ArticleRecommendationsList {...args} />
);

export const ArticleRecommendationsListPrimary = Template.bind({});
ArticleRecommendationsListPrimary.parameters = { ...generateParameters('Primary story') };

export const ArticleRecommendationsListSecondary = Template.bind({});
ArticleRecommendationsListSecondary.parameters = { ...generateParameters('Secondary story') };

export const ArticleRecommendationsListAllDark = Template.bind({});
ArticleRecommendationsListAllDark.parameters = { ...generateParameters('Dark MODE story') };

ArticleRecommendationsListAllDark.decorators = [ThemeDecorator(Theme.DARK)];
