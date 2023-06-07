import { FC, memo, ReactNode, useCallback, ReactElement, isValidElement, cloneElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './NotificationList.module.scss';
import { useNavigate } from '@/app/providers/RouterUtilsProvider/RouterUtilsProvider';
import { VStack } from '@/shared/ui/Stack';

export interface NotificationListSize {
	maxWidth?: string | number;
	minWidth?: string | number;
	maxHeight?: string | number;
	minHeight?: string | number;
}

export interface NotificationListItem {
	disabled?: boolean;
	content?: ReactNode;
	href?: string;
}

export interface NotificationListProps {
	className?: string;
	size?: NotificationListSize;
	isLoading?: boolean;
	onClick?: () => void;
	items: NotificationListItem[];
}

export const NotificationList: FC<NotificationListProps> = memo((props: NotificationListProps) => {
	const { className = '', items, isLoading = false, onClick = () => null, size = {} } = props;

	const navigate = useNavigate();

	const handleNotificationListClick = useCallback(
		(href?: string, onClick?: () => void) => {
			if (onClick) onClick();
			if (href) navigate(href);
		},
		[navigate]
	);

	return (
		<VStack className={classNames(classes.notificationlist, {}, [className])} align={'start'} max>
			{items.map((item, index) => {
				const notificationWithClass = isValidElement(item.content)
					? cloneElement(item.content as ReactElement, {
							className: classNames(
								'',
								{ [classes.disabled]: item.disabled || false, [classes.selected]: !isLoading },
								[]
							)
					  })
					: item.content;
				return (
					<li
						className={classes.notificationitem}
						key={index}
						onClick={() => {
							if (!item.disabled) {
								handleNotificationListClick(item.href, onClick);
							}
						}}
						style={{ ...size }}
					>
						{notificationWithClass}
					</li>
				);
			})}
		</VStack>
	);
});
