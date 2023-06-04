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
import { NotificationList } from 'entities/Notification';
import { useModal } from 'shared/lib/hooks/useModal';

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

	const isMobile = detectMobileDevice();

	const { isOpen, closeHandler } = useModal({
		isOpen: false,
		onClose: cancelAlertNotifications,
		animationDelay: isMobile ? 500 : 300
	});

	const triggerButton = (
		<div onClick={closeHandler}>
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
			<Drawer onClose={closeHandler} isOpen={isOpen}>
				<NotificationList
					items={notificationItems}
					isLoading={notificationIsLoading}
					onClick={() => setTimeout(() => closeHandler(), 100)}
					size={{ minWidth: '100%', maxHeight: 420 }}
				/>
			</Drawer>
		</>
	) : (
		<PopOver
			className={classNames(classes.AddNotificationsButton, {}, [className])}
			items={notificationItems}
			size={{ minWidth: notificationIsError && !notificationIsLoading ? 'max-content' : 320, maxHeight: 420 }}
			isLoading={notificationIsLoading}
			trigger={triggerButton}
		/>
	);
});
