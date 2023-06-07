import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { TextProps, Text, TextTheme, TextSize } from './Text';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/Text',
	component: Text,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof Text>;

const Template: StoryFn<typeof Text> = (args: TextProps) => <Text {...args} />;

export const TextPrimary = Template.bind({});
TextPrimary.args = {
	title: 'Title for primary',
	content: 'Text primary'
};

export const TextError = Template.bind({});
TextError.args = {
	title: 'Title for error',
	content: 'Text error',
	theme: TextTheme.ERROR
};

export const TextErrorDark = Template.bind({});
TextErrorDark.args = {
	title: 'Title for error',
	content: 'Text error',
	theme: TextTheme.ERROR
};
TextErrorDark.decorators = [ThemeDecorator(Theme.DARK)];

export const TextPrimaryTitle = Template.bind({});
TextPrimaryTitle.args = {
	title: 'Title only'
};

export const TextPrimaryContent = Template.bind({});
TextPrimaryContent.args = {
	content: 'Text only'
};

export const TextSizeL = Template.bind({});
TextPrimaryTitle.args = {
	title: 'Some title L',
	content: 'Some content L',
	size: TextSize.L
};

export const TextSizeS = Template.bind({});
TextPrimaryTitle.args = {
	title: 'Some title S',
	content: 'Some content S',
	size: TextSize.S
};

export const TextDark = Template.bind({});
TextDark.args = {
	title: 'Title for dark',
	content: 'Text dark'
};
TextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const TextDarkTitle = Template.bind({});
TextDarkTitle.args = {
	title: 'Title only'
};
TextDarkTitle.decorators = [ThemeDecorator(Theme.DARK)];

export const TextDarkText = Template.bind({});
TextDarkText.args = {
	content: 'Text only'
};
TextDarkText.decorators = [ThemeDecorator(Theme.DARK)];
