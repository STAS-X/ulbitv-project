import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { RatingProps, Rating } from './Rating';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
	title: 'shared/Rating',
	component: Rating,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof Rating>;

const Template: StoryFn<typeof Rating> = (args: RatingProps) => <Rating {...args} />;

export const RatingPrimary = Template.bind({});
RatingPrimary.args = {};

export const RatingSecondary = Template.bind({});
RatingSecondary.args = {};

export const RatingSecondaryDark = Template.bind({});
RatingSecondaryDark.args = {};
RatingSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
