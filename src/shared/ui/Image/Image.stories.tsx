import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Image, ImageProps } from './Image';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import ImageImg from 'shared/assets/images/avatar.jpg';

export default {
	title: 'shared/Image',
	component: Image,
	argTypes: {
		backgroundColor: { control: 'color' }
	},
	args: {
		size: 200,
		src: ImageImg,
		alt: 'Аватарка'
	}
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args: ImageProps) => <Image {...args} />;

export const ImagePrimary = Template.bind({});

ImagePrimary.args = {
	width: 50,
	height: 50,
	alt: 'img primary'
};

export const ImageSecondary = Template.bind({});

ImageSecondary.args = {
	width: 100,
	height: 100,
	alt: 'img secondary'
};

export const ImageDark = Template.bind({});

ImageDark.args = {
	width: 150,
	height: 150,
	alt: 'img on dark theme'
};
ImageDark.decorators = [ThemeDecorator(Theme.DARK)];
