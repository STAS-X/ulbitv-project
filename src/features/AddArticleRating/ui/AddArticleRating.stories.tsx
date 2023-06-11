import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AddArticleRatingProps, AddArticleRating } from '..';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider/lib/ThemeContext';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
	title: 'features/AddArticleRating',
	component: AddArticleRating,
	argTypes: {
		backgroundColor: { control: 'color' }
	},
	args: {
		articleId: '2'
	},
	decorators: [StoreDecorator({ user: { authData: { id: '1', username: 'STAS-XXX', profileId: '1' }, _loaded: true } })]
} as Meta<typeof AddArticleRating>;

const Template: StoryFn<typeof AddArticleRating> = (args: AddArticleRatingProps) => <AddArticleRating {...args} />;

const articleRating = {
	id: '1',
	userId: '1',
	articleId: '2',
	rating: 3,
	feedback: 'Отличный отзыв!'
};

const generateFeedbackResponse = (articleId: string, rating: number, feedback?: string) => {
	return {
		mockAddonConfigs: {
			globalMockData: [
				{
					url: `${_BASE_URL_}/article-ratings?userId=${articleRating.userId}&articleId=${articleId}`,
					method: 'GET',
					status: '200',
					response: [
						{
							...articleRating,
							articleId,
							rating: rating >= 0 ? rating : Math.floor(Math.random() * 5),
							feedback
						}
					]
				},
				{
					url: `${_BASE_URL_}/article-ratings/${articleRating.id}`,
					method: 'PUT',
					status: '200',
					response: [
						{
							...articleRating,
							articleId,
							rating: Math.floor(Math.random() * 5),
							feedback: String(Math.floor(Math.random() * 100))
						}
					]
				},
				{
					url: `${_BASE_URL_}/article-ratings/${articleRating.id}`,
					method: 'POST',
					status: '200',
					response: [
						{
							...articleRating,
							articleId,
							rating: Math.floor(Math.random() * 5),
							feedback: String(Math.floor(Math.random() * 100))
						}
					]
				}
			]
		}
	};
};

export const AddArticleRatingLow = Template.bind({});
AddArticleRatingLow.parameters = { ...generateFeedbackResponse('1', -1, 'Так себе статья') };

export const AddArticleRatingEmpty = Template.bind({});
AddArticleRatingEmpty.parameters = { ...generateFeedbackResponse('1', 0) };

export const AddArticleRatingHigh = Template.bind({});
AddArticleRatingHigh.parameters = { ...generateFeedbackResponse('1', 5, 'Отличная светлая статья') };

export const AddArticleRatingEmptyFeedBack = Template.bind({});
AddArticleRatingEmptyFeedBack.parameters = { ...generateFeedbackResponse('1', 2) };

export const AddArticleRatingDark = Template.bind({});
AddArticleRatingDark.parameters = { ...generateFeedbackResponse('1', 2, 'Отличная темная статья') };
AddArticleRatingDark.decorators = [ThemeDecorator(Theme.DARK)];
