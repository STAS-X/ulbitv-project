import { LoginSchema } from 'features/AuthByUserName';
import { UserSchema } from 'entities/User';
import { CommonSchema } from 'entities/Common';

export interface StateSchema {
	common: CommonSchema;
	user: UserSchema;
	loginForm?: LoginSchema;
}
