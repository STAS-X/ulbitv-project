// eslint-disable-next-line stas-eslint-plugin/layer-imports
import { UserRoleType } from '@/entities/User';

export const checkUserRoles = (userRoles: UserRoleType[] = ['user'], pageRoles: UserRoleType[] = ['user']) => {
	return userRoles.some((role) => {
		return pageRoles.length > 0 ? pageRoles.includes(role) : true;
	});
};
