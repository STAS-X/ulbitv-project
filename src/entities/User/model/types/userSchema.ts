export interface UserData {
	id: string;
	username: string;
	password: string;
}

export interface UserSchema {
	authData?: UserData;
	_loaded: boolean;
}
