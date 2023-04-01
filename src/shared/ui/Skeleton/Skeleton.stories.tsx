import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SkeletonProps, Skeleton } from './Skeleton';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/Skeleton',
	component: Skeleton,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args: SkeletonProps) => <Skeleton {...args} />;

export const SkeletonPrimary = Template.bind({});
SkeletonPrimary.args = { width: '100%', height: '200px' };

export const SkeletonPrimaryDark = Template.bind({});
SkeletonPrimaryDark.args = { width: '100%', height: '200px' };
SkeletonPrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SkeletonCircle = Template.bind({});
SkeletonCircle.args = {
	border: '50%',
	width: '100px',
	height: '100px'
};

export const SkeletonCircleDark = Template.bind({});
SkeletonCircleDark.args = {
	border: '50%',
	width: '100px',
	height: '100px'
};
SkeletonCircleDark.decorators = [ThemeDecorator(Theme.DARK)];
