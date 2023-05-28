import { NOTIFY_LS_KEY } from 'shared/const/localstorage';
import { NotificationSchema } from '../model/types/notificationSchema';

export const checkForNewNotify = (newNotes: NotificationSchema[]) => {
	if (localStorage.getItem(NOTIFY_LS_KEY)) {
		return (
			(newNotes.filter((note) => Boolean(note.id)).map((note) => note.id) || []).join('') !==
			JSON.parse(localStorage.getItem(NOTIFY_LS_KEY) || '[]').join('')
		);
	} else {
		writeNotifyToLS(newNotes);
		return false;
	}
};

export const writeNotifyToLS = (notes: NotificationSchema[]) => {
	localStorage.setItem(
		NOTIFY_LS_KEY,
		JSON.stringify(notes.filter((note) => Boolean(note.id)).map((note) => note.id) || [])
	);
};
