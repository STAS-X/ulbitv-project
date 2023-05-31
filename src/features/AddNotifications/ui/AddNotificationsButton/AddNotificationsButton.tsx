import { FC, memo, useState, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import { PopOver } from 'shared/ui/PopOver/PopOver';
import { Text, TextAlign, TextSize, TextTheme } from 'shared/ui/Text/Text';
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg';
import classes from './AddNotificationsButton.module.scss';
import { useNotifications } from 'shared/lib/hooks/useNotifications';
import { detectMobileDevice } from 'shared/lib/helpers/checkIsMobile';
import { Drawer } from 'shared/ui/Drawer/Drawer';
import { NotificationList } from '../../../../entities/Notification';

interface AddNotificationsButtonProps {
	className?: string;
}

export const AddNotificationsButton: FC<AddNotificationsButtonProps> = memo((props: AddNotificationsButtonProps) => {
	const { className } = props;
	const {
		notes: notificationItems,
		isLoading: notificationIsLoading,
		isError: notificationIsError,
		hasNewNotes,
		count: countNotify,
		cancelNotify: cancelAlertNotifications
	} = useNotifications();

	const [isOpen, setIsOpen] = useState(false);

	const isMobile = detectMobileDevice();

	const handleOpenNotifyList = useCallback(() => {
		setIsOpen(!isOpen);
		cancelAlertNotifications();
	}, [isOpen, setIsOpen, cancelAlertNotifications]);

	const triggerButton = (
		<div onClick={handleOpenNotifyList}>
			<Icon Svg={NotificationIcon} theme={IconTheme.INVERTED} />
			<Text
				className={classes.notifications}
				size={TextSize.M}
				align={TextAlign.CENTER}
				theme={hasNewNotes ? TextTheme.ERROR : TextTheme.INVERTED}
				content={String(countNotify)}
			/>
		</div>
	);

	return isMobile ? (
		<>
			<div className={classes.trigger}>{triggerButton}</div>
			<Drawer onClose={handleOpenNotifyList} isOpen={isOpen}>
				<NotificationList
					items={notificationItems}
					isLoading={notificationIsLoading}
					size={{ minWidth: '100%', maxHeight: 420 }}
				/>
			</Drawer>
		</>
	) : (
		<PopOver
			className={classNames(classes.AddNotificationsButton, {}, [className])}
			items={notificationItems}
			size={{ minWidth: notificationIsError && !notificationIsLoading ? 'max-content' : 300, maxHeight: 420 }}
			isLoading={notificationIsLoading}
			trigger={triggerButton}
		/>
	);
});
