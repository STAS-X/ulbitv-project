import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useLocation } from 'app/providers/RouterUtilsProvider/RouterUtilsProvider';

interface RequireAuthProps {
	children: React.ReactElement;
}

export const RequireAuth = (props: RequireAuthProps) => {
	const { children } = props;

	const isAuth = useSelector(getUserData); // Your hook to get login status
	const location = useLocation(); // Your hook to get login status

	if (!isAuth) {
		return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
	}
	return children;
};
