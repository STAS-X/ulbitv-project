import { FC, memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon, IconTheme } from '@/shared/ui/deprecated/Icon/Icon';
import { Icon as IconRedesign } from '@/shared/ui/redesign/Icon/Icon';
import { PopOver } from '@/shared/ui/deprecated/PopOver/PopOver';
import { PopOver as PopOverRedesign } from '@/shared/ui/redesign/PopOver/PopOver';
import { Text, TextAlign, TextSize, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { Text as TextRedesign } from '@/shared/ui/redesign/Text/Text';
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg';
import NotificationIconRedesign from '@/shared/assets/icons/notification.svg';
import classes from './AddNotificationsButton.module.scss';
import { useNotifications } from '@/shared/lib/hooks/useNotifications';
import { detectMobileDevice } from '@/shared/lib/helpers/checkIsMobile';
import { Drawer } from '@/shared/ui/deprecated/Drawer/Drawer';
import { Drawer as DrawerRedesign } from '@/shared/ui/redesign/Drawer/Drawer';
import { NotificationList } from '@/entities/Notification';
import { useModal } from '@/shared/lib/hooks/useModal';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';

interface AddNotificationsButtonProps {
	className?: string;
}

export const AddNotificationsButtonComponent: FC<AddNotificationsButtonProps> = memo(
	(props: AddNotificationsButtonProps) => {
		const { className } = props;
		const [popoverIsOpen, setPopoverIsOpen] = useState<boolean>(false);
		const {
			notes: notificationItems,
			isLoading: notificationIsLoading,
			isError: notificationIsError,
			hasNewNotes,
			count: countNotify,
			cancelNotify: cancelAlertNotifications
		} = useNotifications();

		const isRedesigned = className === 'NotificationsRedesign';
		// console.log(isRedesigned, 'get redesign navbar');

		const isMobile = detectMobileDevice();

		const { isOpen, closeHandler } = useModal({
			isOpen: false,
			onClose: cancelAlertNotifications,
			animationDelay: isMobile ? 350 : 300
		});

		const handleClose = useCallback(() => {
			if (closeHandler) closeHandler();
			setPopoverIsOpen(false);
		}, [closeHandler, setPopoverIsOpen]);

		console.log(hasNewNotes, 'новые уведомления');

		const triggerButton = isRedesigned ? (
			<>
				<IconRedesign
					Svg={NotificationIconRedesign}
					width={32}
					height={32}
					clickable
					onClick={() => setPopoverIsOpen((prev) => !prev)}
				/>
				<TextRedesign
					className={classNames(classes.notifications, {}, [classes.notifyredesign])}
					size={'s'}
					align={'align-center'}
					bold={hasNewNotes ? true : false}
					variant={hasNewNotes ? 'accent' : 'primary'}
					title={String(countNotify)}
				/>
			</>
		) : (
			<div onClick={handleClose}>
				<Icon Svg={NotificationIcon} width={20} height={20} theme={IconTheme.INVERTED} />
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
				{isRedesigned ? (
					<DrawerRedesign onClose={handleClose} isOpen={popoverIsOpen}>
						<NotificationList
							items={notificationItems}
							isLoading={notificationIsLoading}
							onClick={() => setTimeout(() => handleClose(), 100)}
							size={{ minWidth: '100%', maxHeight: 420 }}
						/>
					</DrawerRedesign>
				) : (
					<Drawer onClose={handleClose} isOpen={isOpen}>
						<NotificationList
							items={notificationItems}
							isLoading={notificationIsLoading}
							onClick={() => setTimeout(() => handleClose(), 100)}
							size={{ minWidth: '100%', maxHeight: 420 }}
						/>
					</Drawer>
				)}
			</>
		) : isRedesigned ? (
			<PopOverRedesign
				className={classNames('', {}, [className])}
				onClose={handleClose}
				items={notificationItems}
				isOpened={popoverIsOpen}
				size={{ minWidth: notificationIsError && !notificationIsLoading ? 'max-content' : 320, maxHeight: 420 }}
				isLoading={notificationIsLoading}
				trigger={triggerButton}
			/>
		) : (
			<PopOver
				className={classNames('', {}, [className])}
				items={notificationItems}
				onClose={handleClose}
				isOpened={popoverIsOpen}
				size={{ minWidth: notificationIsError && !notificationIsLoading ? 'max-content' : 320, maxHeight: 420 }}
				isLoading={notificationIsLoading}
				trigger={triggerButton}
			/>
		);
	}
);

export const AddNotificationsButton: FC<AddNotificationsButtonProps> = (props: AddNotificationsButtonProps) => {
	const { className } = props;

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			off={<AddNotificationsButtonComponent className={className} />}
			on={<AddNotificationsButtonComponent className={'NotificationsRedesign'} />}
		/>
	);
};
