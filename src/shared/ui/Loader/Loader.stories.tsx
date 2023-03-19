import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LoaderProps, Loader } from './Loader';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/Loader',
	component: Loader,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args: LoaderProps) => <Loader {...args} />;

export const LoaderPrimary = Template.bind({});
LoaderPrimary.args = {};

export const LoaderPrimaryDark = Template.bind({});
LoaderPrimaryDark.args = {
	children: 'Text secondary'
};
LoaderPrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
