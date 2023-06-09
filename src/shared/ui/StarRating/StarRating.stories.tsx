import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { StarRatingProps, StarRating } from './StarRating';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/StarRating',
	component: StarRating,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as Meta<typeof StarRating>;

const Template: StoryFn<typeof StarRating> = (args: StarRatingProps) => (
	<StarRating {...args} />
);

export const StarRatingPrimary = Template.bind({});
StarRatingPrimary.args = {
	children: 'Text primary',
	theme: 'Primary',
};

export const StarRatingSecondary = Template.bind({});
StarRatingSecondary.args = {
	children: 'Text secondary',
	theme: 'Secondary',
};

export const StarRatingSecondaryDark = Template.bind({});
StarRatingSecondaryDark.args = {
	children: 'Text secondary',
	theme: 'Secondary',
};
StarRatingSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
