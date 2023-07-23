import { FeatureFlags } from '@/shared/lib/features/featureFlag';
import { JSONSettings } from '@/shared/lib/settings/jsonSettings';

export type UserRoleType = 'admin' | 'user' | 'manager';

export interface UserData {
	id: string;
	username: string;
	profileId: string;
	avatar?: string;
	jsonSettings?:JSONSettings;
	features?: FeatureFlags;
	roles?: UserRoleType[];
}

export interface UserSchema {
	authData?: UserData;
	_loaded: boolean;
}
