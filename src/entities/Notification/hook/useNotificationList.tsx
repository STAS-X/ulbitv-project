import { NotificationListSchema, NotificationItemSchema } from '../model/types/notificationSchema';
import { useGetNotificationsQuery } from '../api/notificationApi';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getErrorMessage } from 'shared/types/thunk/thunkAction';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { NotificationListItem } from '../ui/NotifictionListItem/NotificationListItem';
import { checkForNewNotify, writeNotifyToLS } from '../helpers/checkForNewTotifications';

export const useNotificationList = (): NotificationListSchema => {
	const {
		data: notifications = [],
		isLoading: notificationIsLoading,
		error: notificationError
	} = useGetNotificationsQuery(null, { pollingInterval: 5000 });

	const [notifyCount, setNotifyCount] = useState<number>(0);
	const [hasNewNotes, setHasNewNotes] = useState<boolean>(false);

	const errorMessage = getErrorMessage(notificationError);

	const notificationItems = useMemo<NotificationItemSchema[]>(() => {
		if (notificationIsLoading) {
			return Array.from({ length: 3 }, (_, i) => {
				return { content: <Skeleton key={i} width={300} height={100} border={15} /> };
			});
		}
		if (errorMessage) {
			return [{ content: <Text size={TextSize.S} theme={TextTheme.ERROR} content={errorMessage} /> }];
		}
		setNotifyCount(notifications.length);
		return notifications.map(({ title, description, href }) => {
			return { content: <NotificationListItem title={title} description={description} />, href };
		});
	}, [notificationIsLoading, notifications, errorMessage]);

	useEffect(() => {
		if (checkForNewNotify(notifications) && !hasNewNotes) setHasNewNotes(true);
	}, [hasNewNotes, notifications]);

	const cancelAlertNotifications = useCallback(() => {
		if (hasNewNotes) {
			setHasNewNotes(false);
			writeNotifyToLS(notifications);
		}
	}, [hasNewNotes, notifications]);

	return {
		notes: notificationItems,
		isLoading: notificationIsLoading,
		hasNewNotes,
		count: notifyCount,
		cancelNotify: cancelAlertNotifications
	};
};
