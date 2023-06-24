import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AddNotificationsButton } from './AddNotificationsButton';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { HStack } from '@/shared/ui/Stack';

export default {
	title: 'features/Notifications/AddNotificationsButton',
	component: AddNotificationsButton,
	argTypes: {
		backgroundColor: { control: 'color' }
	},
	args: {
		articleId: '2'
	},
	decorators: [StoreDecorator({ user: { authData: { id: '1', username: 'STAS-XXX', profileId: '1' }, _loaded: true } })]
} as Meta<typeof AddNotificationsButton>;

interface AddNotificationsButtonProps {
	className?: string;
}

const Template: StoryFn<typeof AddNotificationsButton> = (args: AddNotificationsButtonProps) => (
	<HStack max justify={'end'} style={{ padding: 15 }}>
		<AddNotificationsButton {...args} />
	</HStack>
);

const notification = {
	id: '1',
	title: 'Уведомление ',
	description: 'Произошло какое-то событие №',
	href: '',
	userId: '1'
};

const generateFeedbackResponse = (count: number) => {
	return {
		mockAddonConfigs: {
			globalMockData: [
				{
					url: `${_BASE_URL_}/notifications`,
					method: 'GET',
					status: '200',
					response: Array.from({ length: count }, (_, i) => {
						return {
							...notification,
							title: `${notification.title} ${i + 1}`,
							description: `${notification.description} ${i + 1}`
						};
					})
				}
			]
		}
	};
};

export const NotificationsThree = Template.bind({});
NotificationsThree.parameters = { ...generateFeedbackResponse(3) };

export const NotificationsTen = Template.bind({});
NotificationsTen.parameters = { ...generateFeedbackResponse(10) };

export const NotificationsDark = Template.bind({});
NotificationsDark.parameters = { ...generateFeedbackResponse(20) };
NotificationsDark.decorators = [ThemeDecorator(Theme.DARK)];
