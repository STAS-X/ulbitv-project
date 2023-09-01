import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { ScrollButton } from './ScrollButton';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
	title: 'features/ScrollButton',
	component: ScrollButton,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof ScrollButton>;

const Template: StoryFn<typeof ScrollButton> = () => <ScrollButton />;

export const ThemeSwitchButtonNormal = Template.bind({});
ThemeSwitchButtonNormal.decorators = [ThemeDecorator(Theme.LIGHT)];

export const ThemeSwitchButtonDark = Template.bind({});
ThemeSwitchButtonDark.decorators = [ThemeDecorator(Theme.DARK)];
