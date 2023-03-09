export interface UserData {
	id: string;
	userName: string;
	password: string;
}

export interface UserSchema {
	authData?: UserData;
}
