import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { IconProps, Icon } from './Icon';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';

export default {
	title: 'shared/Icon',
	component: Icon,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof Icon>;

const Template: StoryFn<typeof Icon> = (args: IconProps) => <Icon {...args} />;

export const IconEye = Template.bind({});
IconEye.args = {
	Svg: EyeIcon
};

export const IconCalendarDark = Template.bind({});
IconCalendarDark.args = {
	Svg: CalendarIcon
};
IconCalendarDark.decorators = [ThemeDecorator(Theme.DARK)];
