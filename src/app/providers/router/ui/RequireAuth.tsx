import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserData, UserRoleType, getUserRoles } from '@/entities/User';
import { RoutePath } from '@/shared/config/routeConfig';
import { checkUserRoles } from '@/shared/lib/helpers/checkUserRoles';
import { useLocation } from '@/shared/lib/hooks/useRouterUtils';

interface RequireAuthProps {
	children: React.ReactElement;
	roles?: UserRoleType[];
	isAuth?: boolean;
}

export const RequireAuth = (props: RequireAuthProps) => {
	const { children, roles = [], isAuth = false } = props;

	const hasAuth = useSelector(getUserData); // Your hook to get login status
	const userRoles = useSelector(getUserRoles); // Get user roles to check access
	const location = useLocation(); // Your hook to get login status

	//console.log(userRoles, roles, 'get roles to check access');
	const hasAccess = checkUserRoles(userRoles, roles);

	if (!hasAccess || (isAuth && !hasAuth)) {
		return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
	}

	if (!hasAuth) {
		return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
	}
	return children;
};
