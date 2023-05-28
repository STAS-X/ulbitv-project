import { ReactNode } from 'react';

export interface NotificationSchema {
	id: string;
	title: string;
	description: string;
	href?: string;
}

export interface NotificationItemSchema {
	disabled?: boolean;
	content?: ReactNode;
	onClick?: () => void;
	href?: string;
}

export interface NotificationListSchema {
	notes: NotificationItemSchema[];
	isLoading: boolean;
	hasNewNotes: boolean;
	count: number;
	cancelNotify: () => void;
}
