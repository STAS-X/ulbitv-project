import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListBoxSelectorProps, ListBoxSelector } from './ListBoxSelector';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';

export default {
	title: 'shared/ListBoxSelector',
	component: ListBoxSelector,
	args: {
		items: [
			{ id: 1, value: 'item 1', content: 'Durward Reynolds', disabled: false },
			{ id: 2, value: 'item 2', content: 'Kenton Towne', disabled: false },
			{ id: 3, value: 'item 3', content: 'Therese Wunsch', disabled: false },
			{ id: 4, value: 'item 4', content: 'Benedict Kessler', disabled: true },
			{ id: 5, value: 'item 5', content: 'Katelyn Rohan', disabled: false }
		],
		value: 'Durward Reynolds',
		defaultValue: 'Default value'
	}
} as ComponentMeta<typeof ListBoxSelector>;

const Template: ComponentStory<typeof ListBoxSelector> = (args: ListBoxSelectorProps) => <ListBoxSelector {...args} />;

export const ListBoxPrimary = Template.bind({});
ListBoxPrimary.args = {
	children: 'Text primary'
};

export const ListBoxSecondary = Template.bind({});
ListBoxSecondary.args = {
	children: 'Text secondary'
};

export const ListBoxSecondaryDark = Template.bind({});
ListBoxSecondaryDark.args = {
	children: 'Text secondary'
};
ListBoxSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
