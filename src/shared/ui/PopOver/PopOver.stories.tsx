import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { PopOverProps, PopOver } from './PopOver';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
	title: 'shared/PopOver',
	component: PopOver,
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
} as Meta<typeof PopOver>;

const inlineConteinerStyle: React.CSSProperties = {
	display: 'flex',
	width: '100vw',
	height: '100vh',
	justifyContent: 'center',
	alignItems: 'center'
};

const Template: StoryFn<typeof PopOver> = (args: PopOverProps) => <PopOver {...args} />;

export const PopOverBottomRight = Template.bind({});
PopOverBottomRight.args = {
	direction: 'bottomRight'
};

export const PopOverBottomLeft = Template.bind({});
PopOverBottomLeft.args = {
	direction: 'bottomLeft'
};

export const PopOverTopRight = Template.bind({});
PopOverTopRight.args = {
	direction: 'topRight'
};

export const PopOverTopLeft = Template.bind({});
PopOverTopLeft.args = {
	direction: 'topLeft'
};

export const PopOverSecondaryDark = Template.bind({});

PopOverSecondaryDark.decorators = [
	(Story) => (
		<div style={inlineConteinerStyle}>
			<Story />
		</div>
	),
	ThemeDecorator(Theme.DARK)
];
