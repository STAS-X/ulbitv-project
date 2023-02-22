import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ButtonProps, Button, ThemeButton } from './Button';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/Button',
	component: Button,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: ButtonProps) => (
	<Button {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
	children: 'Text primary',
	theme: 'Primary',
};

export const Outline = Template.bind({});

Outline.args = {
	children: 'Text outline',
	theme: ThemeButton.OUTLINE,
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
	children: 'Text outline',
	theme: ThemeButton.OUTLINE,
};

OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Clear = Template.bind({});

Clear.args = {
	children: 'Text clear',
	theme: ThemeButton.CLEAR,
};

