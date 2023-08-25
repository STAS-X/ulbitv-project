import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { ThemeSwitchButtonProps, ThemeSwitchButton } from './ThemeSwitchButton';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
	title: 'features/ThemeSwitchButton',
	component: ThemeSwitchButton,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof ThemeSwitchButton>;

const Template: StoryFn<typeof ThemeSwitchButton> = (args: ThemeSwitchButtonProps) => <ThemeSwitchButton {...args} />;

export const ThemeSwitchButtonNormal = Template.bind({});
ThemeSwitchButtonNormal.args = {};
ThemeSwitchButtonNormal.decorators = [ThemeDecorator(Theme.LIGHT)];

export const ThemeSwitchButtonDark = Template.bind({});
ThemeSwitchButtonDark.args = {};
ThemeSwitchButtonDark.decorators = [ThemeDecorator(Theme.DARK)];
