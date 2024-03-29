import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { ButtonTheme, ButtonProps, Button, ButtonSize } from './Button';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
	title: 'shared/Button',
	component: Button,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args: ButtonProps) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	children: 'Text primary',
	theme: ButtonTheme.CLEAR
};

export const Outline = Template.bind({});

Outline.args = {
	children: 'Text outline',
	theme: ButtonTheme.OUTLINE
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
	children: 'Text outline',
	theme: ButtonTheme.OUTLINE
};

OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Clear = Template.bind({});

Clear.args = {
	children: 'Clear',
	theme: ButtonTheme.CLEAR
};

export const Inverted = Template.bind({});

Inverted.args = {
	children: 'Inverted',
	theme: ButtonTheme.INVERTED
};

export const Background = Template.bind({});

Background.args = {
	children: 'Text',
	theme: ButtonTheme.BACKGROUND
};

export const ButtonDisabled = Template.bind({});

ButtonDisabled.args = {
	children: 'Text',
	theme: ButtonTheme.OUTLINE,
	disabled: true
};

export const BackgroundInvertedSizeM = Template.bind({});

BackgroundInvertedSizeM.args = {
	children: 'Text',
	theme: ButtonTheme.BACKGROUND_INVERTED,
	size: ButtonSize.M
};

export const SquareSizeM = Template.bind({});
SquareSizeM.args = {
	children: 'Square',
	theme: ButtonTheme.BACKGROUND_INVERTED,
	size: ButtonSize.M,
	square: true
};

export const BackgroundInvertedSizeXL = Template.bind({});

BackgroundInvertedSizeXL.args = {
	children: 'Text',
	theme: ButtonTheme.BACKGROUND_INVERTED,
	size: ButtonSize.XL
};

export const SquareSizeXL = Template.bind({});
SquareSizeXL.args = {
	children: 'Square',
	theme: ButtonTheme.BACKGROUND_INVERTED,
	size: ButtonSize.XL,
	square: true
};
