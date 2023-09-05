// eslint-disable-next-line stas-eslint-plugin/layer-imports
import {
	NotificationListSchema,
	NotificationItemSchema,
	useGetNotificationsQuery,
	NotificationListItem,
	checkForNewNotify,
	writeNotifyToLS
} from '@/entities/Notification';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getErrorMessage } from '@/shared/types/thunk/thunkAction';
import { Skeleton as SkeletonDepracated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesign } from '@/shared/ui/redesign/Skeleton/Skeleton';
import { Text, TextSize, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { toggleFeatures } from '../features/ToggleFeatures';

export const useNotifications = (): NotificationListSchema => {
	const {
		data: notifications = [],
		isLoading,
		error: notificationError
	} = useGetNotificationsQuery(null, { pollingInterval: 15000 });

	const [notifyCount, setNotifyCount] = useState<number>(0);
	const [hasNewNotes, setHasNewNotes] = useState<boolean>(false);
	const [notificationIsLoading, setNotificationIsLoading] = useState<boolean>(true);

	const errorMessage = notificationError ? getErrorMessage(notificationError) : '';
	console.log(notificationIsLoading, isLoading, 'isloading notification');
	// @ts-ignore
	const Skeleton = toggleFeatures({ feature: 'isAppRedesigned', on: SkeletonRedesign, off: SkeletonDepracated });

	const notificationItems = useMemo<NotificationItemSchema[]>(() => {
		if (notificationIsLoading) {
			return Array.from({ length: 3 }, (_, i) => {
				return { content: <Skeleton key={i} width={'100%'} height={100}
border={30} /> };
			});
		}

		if (errorMessage) {
			return [{ content: <Text size={TextSize.S} theme={TextTheme.ERROR} content={errorMessage} /> }];
		}
		setNotifyCount(Boolean(errorMessage) ? 0 : notifications.length);
		return notifications.map(({ title, description, href }) => {
			return { content: <NotificationListItem title={title} description={description} />, href };
		});
	}, [notificationIsLoading, notifications, errorMessage, Skeleton]);

	useEffect(() => {
		if (checkForNewNotify(notifications) && !hasNewNotes) setHasNewNotes(true);
	}, [hasNewNotes, notifications]);

	useEffect(() => {
		if (!isLoading) setTimeout(() => setNotificationIsLoading(false), 3000);
	}, [isLoading]);

	const cancelAlertNotifications = useCallback(() => {
		//console.log('запускаем функцию прекращения уведомлений');
		if (hasNewNotes) {
			console.log('запустили функцию прекращения уведомлений');
			setHasNewNotes(false);
			writeNotifyToLS(notifications);
		}
	}, [hasNewNotes, notifications]);

	return {
		notes: notificationItems,
		isLoading: notificationIsLoading,
		isError: Boolean(errorMessage),
		hasNewNotes,
		count: notifyCount,
		cancelNotify: cancelAlertNotifications
	};
};
