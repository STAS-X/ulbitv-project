import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AddArticleRatingProps, AddArticleRating } from '..';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/AddArticleRating',
	component: AddArticleRating,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof AddArticleRating>;

const Template: StoryFn<typeof AddArticleRating> = (args: AddArticleRatingProps) => <AddArticleRating {...args} />;

export const AddArticleRatingPrimary = Template.bind({});
AddArticleRatingPrimary.args = {};

export const AddArticleRatingSecondary = Template.bind({});
AddArticleRatingSecondary.args = {};

export const AddArticleRatingSecondaryDark = Template.bind({});
AddArticleRatingSecondaryDark.args = {};
AddArticleRatingSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
