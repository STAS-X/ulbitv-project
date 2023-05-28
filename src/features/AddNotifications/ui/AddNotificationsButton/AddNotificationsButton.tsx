import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import { PopOver } from 'shared/ui/PopOver/PopOver';
import { Text, TextAlign, TextSize, TextTheme } from 'shared/ui/Text/Text';
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg';
import classes from './AddNotificationsButton.module.scss';
import { useNotificationList } from 'entities/Notification';

interface AddNotificationsButtonProps {
	className?: string;
}

export const AddNotificationsButton: FC<AddNotificationsButtonProps> = memo((props: AddNotificationsButtonProps) => {
	const { className } = props;
	const {
		notes: notificationItems,
		isLoading: notificationIsLoading,
		hasNewNotes,
		count: notifyCount,
		cancelNotify: cancelAlertNotifications
	} = useNotificationList();

	return (
		<PopOver
			className={classNames(classes.AddNotificationsButton, {}, [className])}
			items={notificationItems}
			size={{ maxWidth: 350, maxHeight: 400 }}
			isLoading={notificationIsLoading}
			trigger={
				<div onClick={cancelAlertNotifications}>
					<Icon Svg={NotificationIcon} theme={IconTheme.INVERTED} />
					<Text
						className={classes.notifications}
						size={TextSize.M}
						align={TextAlign.CENTER}
						theme={hasNewNotes ? TextTheme.ERROR : TextTheme.INVERTED}
						content={String(notifyCount)}
					/>
				</div>
			}
		/>
	);
});
