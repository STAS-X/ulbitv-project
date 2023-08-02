import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { StarRatingProps, StarRating } from './StarRating';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
	title: 'shared/StarRating',
	component: StarRating,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof StarRating>;

const Template: StoryFn<typeof StarRating> = (args: StarRatingProps) => <StarRating {...args} />;

export const StarRatingPrimary = Template.bind({});
StarRatingPrimary.args = {};

export const StarRatingSecondary = Template.bind({});
StarRatingSecondary.args = {};

export const StarRatingSecondaryDark = Template.bind({});
StarRatingSecondaryDark.args = {};
StarRatingSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
