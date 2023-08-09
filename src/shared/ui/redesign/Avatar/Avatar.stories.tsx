import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { Avatar, AvatarProps } from './Avatar';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import AvatarImg from '@/shared/assets/images/avatar.jpg';

export default {
	title: 'shared/redesigned/Avatar',
	component: Avatar,
	argTypes: {
		backgroundColor: { control: 'color' }
	},
	args: {
		size: 200,
		src: AvatarImg,
		alt: 'Аватарка'
	}
} as Meta<typeof Avatar>;

const Template: StoryFn<typeof Avatar> = (args: AvatarProps) => <Avatar {...args} />;

export const AvatarPrimary = Template.bind({});

AvatarPrimary.args = {
	size: 50,
	alt: 'img primary'
};

export const AvatarSecondary = Template.bind({});

AvatarSecondary.args = {
	size: 100,
	alt: 'img secondary'
};

export const AvatarDark = Template.bind({});

AvatarDark.args = {
	size: 150,
	alt: 'img on dark theme'
};
AvatarDark.decorators = [ThemeDecorator(Theme.DARK)];
