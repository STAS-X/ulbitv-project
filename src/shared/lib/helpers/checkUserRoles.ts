import { UserRoleType } from '@/entities/User/model/types/userSchema';

export const checkUserRoles = (userRoles: UserRoleType[] = [], pageRoles: UserRoleType[] = []) => {
	return (
		userRoles?.some((role) => {
			return pageRoles.length > 0 ? pageRoles.includes(role) : true;
		}) || false
	);
};
