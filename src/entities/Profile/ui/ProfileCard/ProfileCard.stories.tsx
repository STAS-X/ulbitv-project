import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProfileCard, ProfileCardProps } from './ProfileCard';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

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
	title: 'entities/ProfileCard',
	component: ProfileCard,
	argTypes: {
		backgroundColor: { control: 'color' }
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
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args: ProfileCardProps) => <ProfileCard {...args} />;

export const ProfileCardReadOnly = Template.bind({});
ProfileCardReadOnly.args = {
	data: {
		username: 'admin',
		age: 22,
		avatar: '/avatar.jpg',
		country: Country.Ukraine,
		lastname: 'bsu',
		first: 'xxx',
		city: 'Moskow',
		currency: Currency.EUR
	},
	readonly: true
};

export const ProfileCardError = Template.bind({});
ProfileCardError.args = {
	error: 'Error occured'
};

export const ProfileCardLoading = Template.bind({});
ProfileCardLoading.args = {
	isLoading: true
};

export const ProfileCardEditDark = Template.bind({});
ProfileCardEditDark.args = {
	data: formData,
	isLoading: false,
	readonly: false
};
ProfileCardEditDark.decorators = [ThemeDecorator(Theme.DARK)];
