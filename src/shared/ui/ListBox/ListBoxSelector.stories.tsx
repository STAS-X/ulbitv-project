import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ListBoxSelectorProps, ListBoxSelector } from './ListBoxSelector';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider/lib/ThemeContext';

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
	},
	decorators: [
		(Story) => (
			<div style={inlineConteinerStyle}>
				<Story />
			</div>
		)
	]
} as Meta<typeof ListBoxSelector>;

const inlineConteinerStyle: React.CSSProperties = {
	display: 'flex',
	width: '100vw',
	height: '100vh',
	justifyContent: 'center',
	alignItems: 'center'
};

const Template: StoryFn<typeof ListBoxSelector> = (args: ListBoxSelectorProps) => <ListBoxSelector {...args} />;

export const ListBoxBottomRight = Template.bind({});
ListBoxBottomRight.args = {
	direction: 'bottomRight'
};

export const ListBoxBottomLeft = Template.bind({});
ListBoxBottomLeft.args = {
	direction: 'bottomLeft'
};

export const ListBoxTopRight = Template.bind({});
ListBoxTopRight.args = {
	direction: 'topRight'
};

export const ListBoxTopLeft = Template.bind({});
ListBoxTopLeft.args = {
	direction: 'topLeft'
};

export const ListBoxSecondaryDark = Template.bind({});
ListBoxSecondaryDark.args = {
	children: 'Text secondary'
};
ListBoxSecondaryDark.decorators = [
	(Story) => (
		<div style={inlineConteinerStyle}>
			<Story />
		</div>
	),
	ThemeDecorator(Theme.DARK)
];
