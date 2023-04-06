export interface UserData {
	id: string;
	username: string;
	avatar?: string;
}

export interface UserSchema {
	authData?: UserData;
	_loaded: boolean;
}
