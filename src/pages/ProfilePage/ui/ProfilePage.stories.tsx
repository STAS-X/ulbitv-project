import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import ProfilePage, { ProfilePageProps } from './ProfilePage';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
	title: 'pages/ProfilePage',
	component: ProfilePage,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
} as Meta<typeof ProfilePage>;

const Template: StoryFn<typeof ProfilePage> = (args: ProfilePageProps) => <ProfilePage {...args} />;

const formData = {
	username: 'admin',
	avatar: 'avatar.jpg',
	age: 26,
	country: Country.Ukraine,
	lastname: 'SUB',
	first: '-XXX-',
	city: 'Moskow',
	currency: Currency.USD
};

export const ProfilePagePrimary = Template.bind({});

ProfilePagePrimary.decorators = [
	StoreDecorator({
		profile: {
			formData: formData,
			data: formData,
			isLoading: false,
			readonly: false
		}
	})
];

export const ProfilePageDark = Template.bind({});

ProfilePageDark.decorators = [
	StoreDecorator({
		profile: {
			formData: formData,
			data: formData,
			isLoading: false,
			readonly: false
		}
	}),
	ThemeDecorator(Theme.DARK)
];
