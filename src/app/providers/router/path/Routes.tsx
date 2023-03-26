import { ProfilePage } from 'pages/ProfilePage';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export const routeConfig = (isAuth: boolean) => {
	return Object.entries(RoutePath)
		.filter(([key, route]) => route.isAuth === isAuth || route.isAuth === false)
		.map(([key, route]) => route);
};
