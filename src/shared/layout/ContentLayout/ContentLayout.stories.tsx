import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ContentLayoutProps, ContentLayout } from './ContentLayout';
import { ThemeDecorator } from '../../config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../const/theme';

export default {
	title: 'shared/ContentLayout',
	component: ContentLayout,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof ContentLayout>;

const Template: StoryFn<typeof ContentLayout> = (args: ContentLayoutProps) => <ContentLayout {...args} />;

export const MainLayoutPrimary = Template.bind({});

export const MainLayoutSecondary = Template.bind({});

export const MainLayoutSecondaryDark = Template.bind({});

MainLayoutSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
