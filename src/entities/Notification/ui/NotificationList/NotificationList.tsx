import { FC, memo, ReactNode, useCallback, ReactElement, isValidElement, cloneElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './NotificationList.module.scss';
import { useNavigate } from '@/shared/lib/hooks/useRouterUtils';
import { VStack } from '@/shared/ui/redesign/Stack';
import { Skeleton as SkeletonDepracated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesign } from '@/shared/ui/redesign/Skeleton/Skeleton';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';

interface NotificationListSize {
	maxWidth?: string | number;
	minWidth?: string | number;
	maxHeight?: string | number;
	minHeight?: string | number;
}

interface NotificationListItem {
	disabled?: boolean;
	content?: ReactNode;
	href?: string;
}

interface NotificationListProps {
	className?: string;
	size?: NotificationListSize;
	isLoading?: boolean;
	onClick?: () => void;
	items: NotificationListItem[];
}

const NotificationListComponent: FC<NotificationListProps> = memo((props: NotificationListProps) => {
	const { className = '', items, isLoading = true, onClick = () => null, size = {} } = props;

	const isRedesigned = className === classes.notificationlistredesign;
	// console.log(isRedesigned, 'get redesign notifylist');
	// @ts-ignore
	const Skeleton = toggleFeatures({ feature: 'isAppRedesigned', on: SkeletonRedesign, off: SkeletonDepracated });

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
							className: isRedesigned
								? classNames(
										'',
										{
											[classes.disabledredesign]: item.disabled || false,
											[classes.selectedredesign]: !isLoading
										},
										[classes.itemredesign]
								  )
								: classNames(
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
						{isLoading ? <Skeleton width={'100%'} height={80} border={16} /> : notificationWithClass}
					</li>
				);
			})}
		</VStack>
	);
});

export const NotificationList: FC<NotificationListProps> = (props: NotificationListProps) => {
	console.log(props, 'notify listitem');
	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			off={<NotificationListComponent {...props} className={props.className} />}
			on={<NotificationListComponent {...props} className={classes.notificationlistredesign} />}
		/>
	);
};
