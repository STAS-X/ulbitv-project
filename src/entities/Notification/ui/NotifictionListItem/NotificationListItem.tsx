import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card/Card';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import classes from './NotificationListItem.module.scss';

interface NotificationListItemProps {
	className?: string;
	title: string;
	description: string;
}

export const NotificationListItem: FC<NotificationListItemProps> = (props: NotificationListItemProps) => {
	const { className, title, description } = props;

	return (
		<Card className={classNames(classes.notificationlistitem, {}, [className])}>
			<Text title={title} size={TextSize.L} />
			<Text title={description} />
		</Card>
	);
};
