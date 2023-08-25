import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { Card as CardRedesign } from '@/shared/ui/redesign/Card/Card';
import { Text, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { Text as TextRedesign } from '@/shared/ui/redesign/Text/Text';
import classes from './NotificationListItem.module.scss';
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures';

interface NotificationListItemProps {
	className?: string;
	title: string;
	description: string;
}

const NotificationListItemComponent: FC<NotificationListItemProps> = (props: NotificationListItemProps) => {
	const { className, title, description } = props;

	const isRedesigned = className?.startsWith(classes.notificationlistitemredesign);

	return isRedesigned ? (
		<CardRedesign className={classNames(classes.notificationlistitem, {}, [className])}>
			<TextRedesign title={title} size={'l'} />
			<TextRedesign title={description} />
		</CardRedesign>
	) : (
		<Card className={classNames(classes.notificationlistitem, {}, [className])}>
			<Text title={title} size={TextSize.L} />
			<Text title={description} />
		</Card>
	);
};

export const NotificationListItem: FC<NotificationListItemProps> = (props: NotificationListItemProps) => {
	const { className } = props;

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			off={
				<NotificationListItemComponent
					{...props}
					className={classNames(classes.notificationlistitem, {}, [className])}
				/>
			}
			on={
				<NotificationListItemComponent
					{...props}
					className={classNames(classes.notificationlistitemredesign, {}, [className])}
				/>
			}
		/>
	);
};
