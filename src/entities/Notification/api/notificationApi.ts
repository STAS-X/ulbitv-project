import { NotificationSchema } from '../model/types/notificationSchema';
import { rtkApi } from '@/shared/api/rtkApi';

const notificationApi = rtkApi.injectEndpoints({
	endpoints: (builder) => ({
		getNotifications: builder.query<NotificationSchema[], null>({
			query: () => ({
				url: '/notifications'
			})
		})
	}),
	overrideExisting: true
});

export const { useGetNotificationsQuery } = notificationApi;
