import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProfileCard, ProfileCardProps } from './ProfileCard';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

export default {
	title: 'entities/ProfileCard',
	component: ProfileCard,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args: ProfileCardProps) => <ProfileCard {...args} />;

export const ProfileCardPrimary = Template.bind({});
ProfileCardPrimary.args = {
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

export const ProfileCardDark = Template.bind({});
ProfileCardDark.args = {
	data: {
		username: 'admin',
		avatar: 'avatar.jpg',
		age: 26,
		country: Country.Ukraine,
		lastname: 'SUB',
		first: '-XXX-',
		city: 'Moskow',
		currency: Currency.USD
	},
	readonly: false
};
ProfileCardDark.decorators = [ThemeDecorator(Theme.DARK)];
