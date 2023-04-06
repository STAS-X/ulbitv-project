import { UserData } from 'entities/User';

export interface CommentSchema {
	id: string;
	user: UserData;
	text: string;
}
