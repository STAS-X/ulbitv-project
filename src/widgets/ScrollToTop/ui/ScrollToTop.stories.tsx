import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ScrollToTop } from './ScrollToTop';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
	title: 'widget/ScrollToTop',
	component: ScrollToTop,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof ScrollToTop>;

const Template: StoryFn<typeof ScrollToTop> = () => <ScrollToTop />;

export const LightErrorPage = Template.bind({});

export const DarkErrorPage = Template.bind({});

DarkErrorPage.decorators = [ThemeDecorator(Theme.DARK)];
