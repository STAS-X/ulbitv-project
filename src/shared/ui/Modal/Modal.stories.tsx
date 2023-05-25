import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { Modal, ModalProps } from './Modal';

export default {
	title: 'shared/ModalAuth',
	component: Modal,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = (args: ModalProps) => <Modal {...args} />;

export const NormalModal = Template.bind({});

NormalModal.args = {
	children:
		'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium inventore quas vel quis nihil distinctio ab pariatur debitis, alias, tempora provident fugiat officia itaque cum eligendi. Impedit distinctio consequuntur et!',
	isOpen: true
};

export const DarkModal = Template.bind({});

DarkModal.args = {
	children:
		'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium inventore quas vel quis nihil distinctio ab pariatur debitis, alias, tempora provident fugiat officia itaque cum eligendi. Impedit distinctio consequuntur et!',
	isOpen: true
};

DarkModal.decorators = [ThemeDecorator(Theme.DARK)];
