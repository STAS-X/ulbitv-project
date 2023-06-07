import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { PageError, PageErrorProps } from './PageError';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'widget/PageError',
	component: PageError,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof PageError>;

const Template: StoryFn<typeof PageError> = (args: PageErrorProps) => <PageError {...args} />;

export const LightErrorPage = Template.bind({});

LightErrorPage.args = {
	message: 'Светлая тема'
};

export const DarkErrorPage = Template.bind({});

DarkErrorPage.args = {
	message: 'Темная тема'
};

DarkErrorPage.decorators = [ThemeDecorator(Theme.DARK)];
