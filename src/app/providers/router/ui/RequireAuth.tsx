import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserData, getUserRoles } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useLocation } from 'app/providers/RouterUtilsProvider/RouterUtilsProvider';
import { UserRoleType } from 'entities/User/model/types/userSchema';
import { checkUserRoles } from 'shared/lib/helpers/checkUserRoles';

interface RequireAuthProps {
	children: React.ReactElement;
	roles?: UserRoleType[];
}

export const RequireAuth = (props: RequireAuthProps) => {
	const { children, roles = [] } = props;

	const isAuth = useSelector(getUserData); // Your hook to get login status
	const userRoles = useSelector(getUserRoles); // Get user roles to check access
	const location = useLocation(); // Your hook to get login status

	const hasAccess = checkUserRoles(userRoles, roles);

	if (!hasAccess) {
		return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
	}

	if (!isAuth) {
		return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
	}
	return children;
};
