import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { DropDownProps, DropDown } from './DropDown';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
	title: 'shared/redesigned/DropDown',
	component: DropDown,
	args: {
		trigger: 'Click on me',
		items: [
			{ content: 'Menu 1', onClick: () => console.log('Click on menu 1') },
			{ content: 'Menu 2', onClick: () => console.log('Click on menu 2') },
			{ content: 'Menu 3', onClick: () => console.log('Click on menu 3'), disabled: true }
		]
	},
	decorators: [
		(Story) => (
			<div style={inlineConteinerStyle}>
				<Story />
			</div>
		)
	]
} as Meta<typeof DropDown>;

const inlineConteinerStyle: React.CSSProperties = {
	display: 'flex',
	width: '100vw',
	height: '100vh',
	justifyContent: 'center',
	alignItems: 'center'
};

const Template: StoryFn<typeof DropDown> = (args: DropDownProps) => <DropDown {...args} />;

export const DropDownBottomRight = Template.bind({});
DropDownBottomRight.args = {
	direction: 'bottomRight'
};

export const DropDownBottomLeft = Template.bind({});
DropDownBottomLeft.args = {
	direction: 'bottomLeft'
};

export const DropDownTopRight = Template.bind({});
DropDownTopRight.args = {
	direction: 'topRight'
};

export const DropDownTopLeft = Template.bind({});
DropDownTopLeft.args = {
	direction: 'topLeft'
};

export const DropDownSecondaryDark = Template.bind({});

DropDownSecondaryDark.decorators = [
	(Story) => (
		<div style={inlineConteinerStyle}>
			<Story />
		</div>
	),
	ThemeDecorator(Theme.DARK)
];
