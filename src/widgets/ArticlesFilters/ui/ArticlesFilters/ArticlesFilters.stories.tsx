import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ArticlesFiltersProps, ArticlesFilters } from './ArticlesFilters';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
	title: 'widget/ArticlesFilters',
	component: ArticlesFilters,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof ArticlesFilters>;

const Template: StoryFn<typeof ArticlesFilters> = (args: ArticlesFiltersProps) => <ArticlesFilters {...args} />;

export const ArticlesFiltersPrimary = Template.bind({});

export const ArticlesFiltersPrimaryDark = Template.bind({});

ArticlesFiltersPrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
