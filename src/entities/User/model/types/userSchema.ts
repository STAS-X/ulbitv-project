export type UserRoleType = 'admin' | 'user' | 'manager';

export interface UserData {
	id: string;
	username: string;
	profileId: string;
	avatar?: string;
	roles?: UserRoleType[];
}

export interface UserSchema {
	authData?: UserData;
	_loaded: boolean;
}
