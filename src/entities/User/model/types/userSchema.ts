import { FeatureFlags } from '@/shared/lib/features/featureFlag';

export type UserRoleType = 'admin' | 'user' | 'manager';

export interface UserData {
	id: string;
	username: string;
	profileId: string;
	avatar?: string;
	features?: FeatureFlags;
	roles?: UserRoleType[];
}

export interface UserSchema {
	authData?: UserData;
	_loaded: boolean;
}
