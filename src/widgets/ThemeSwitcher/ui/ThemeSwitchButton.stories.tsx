import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeSwitchButtonProps, ThemeSwitchButton } from './ThemeSwitchButton';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/ThemeSwitchButton',
	component: ThemeSwitchButton,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as ComponentMeta<typeof ThemeSwitchButton>;

const Template: ComponentStory<typeof ThemeSwitchButton> = (args: ThemeSwitchButtonProps) => (
	<ThemeSwitchButton {...args} />
);

export const ThemeSwitchButtonNormal = Template.bind({});
ThemeSwitchButtonNormal.args = {};
ThemeSwitchButtonNormal.decorators = [ThemeDecorator(Theme.LIGHT)];

export const ThemeSwitchButtonDark = Template.bind({});
ThemeSwitchButtonDark.args = {};
ThemeSwitchButtonDark.decorators = [ThemeDecorator(Theme.DARK)];
