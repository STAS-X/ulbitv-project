import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { LoaderProps, Loader } from './Loader';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
	title: 'shared/redesigned/Loader',
	component: Loader,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof Loader>;

const Template: StoryFn<typeof Loader> = (args: LoaderProps) => <Loader {...args} />;

export const LoaderPrimary = Template.bind({});
LoaderPrimary.args = {};

export const LoaderPrimaryDark = Template.bind({});
LoaderPrimaryDark.args = {
	children: 'Text secondary'
};
LoaderPrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
