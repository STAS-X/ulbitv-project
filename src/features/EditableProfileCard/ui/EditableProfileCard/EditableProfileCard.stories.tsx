import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { EditableProfileCardProps, EditableProfileCard } from './EditableProfileCard';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

const formData = {
	id: '1',
	username: 'admin',
	avatar: 'avatar.jpg',
	age: 26,
	country: Country.Ukraine,
	lastname: 'SUB',
	first: '-XXX-',
	city: 'Moskow',
	currency: Currency.USD
};

export default {
	title: 'features/EditableProfileCard',
	component: EditableProfileCard,
	args: {
		id: '1'
	},
	decorators: [
		StoreDecorator({
			profile: {
				formData: formData,
				data: formData,
				isLoading: false,
				readonly: false
			}
		})
	]
} as Meta<typeof EditableProfileCard>;

const Template: StoryFn<typeof EditableProfileCard> = (args: EditableProfileCardProps) => (
	<EditableProfileCard {...args} />
);

export const EditableProfilePagePrimary = Template.bind({});

export const EditableProfilePageDark = Template.bind({});

EditableProfilePageDark.decorators = [ThemeDecorator(Theme.DARK)];
