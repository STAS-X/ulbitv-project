import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { ButtonProps, Button } from './Button';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
	title: 'shared/redesigned/Button',
	component: Button,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args: ButtonProps) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	children: 'Text primary',
	variant: 'clear'
};

export const Outline = Template.bind({});

Outline.args = {
	children: 'Text outline',
	variant: 'outline'
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
	children: 'Text outline',
	variant: 'outline'
};

OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Clear = Template.bind({});

Clear.args = {
	children: 'Clear',
	variant: 'clear'
};

export const Inverted = Template.bind({});

Inverted.args = {
	children: 'Inverted',
	variant: 'inverted'
};

export const Background = Template.bind({});

Background.args = {
	children: 'Text',
	variant: 'background'
};

export const ButtonDisabled = Template.bind({});

ButtonDisabled.args = {
	children: 'Text',
	variant: 'outline',
	disabled: true
};

export const BackgroundInvertedSizeM = Template.bind({});

BackgroundInvertedSizeM.args = {
	children: 'Text',
	variant: 'backgroundInverted',
	size: 'm'
};

export const SquareSizeM = Template.bind({});
SquareSizeM.args = {
	children: 'Square',
	variant: 'backgroundInverted',
	size: 'm',
	square: true
};

export const BackgroundInvertedSizeXL = Template.bind({});

BackgroundInvertedSizeXL.args = {
	children: 'Text',
	variant: 'backgroundInverted',
	size: 'xl'
};

export const SquareSizeXL = Template.bind({});
SquareSizeXL.args = {
	children: 'Square',
	variant: 'backgroundInverted',
	size: 'xl',
	square: true
};
