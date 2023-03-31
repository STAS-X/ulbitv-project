import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export const routeConfig = (/* isAuth: boolean */) => {
	return (
		Object.entries(RoutePath)
			//.filter(([key, route]) => route.isAuth === isAuth || route.isAuth === false || isAuth === undefined)
			.map(([key, route]) => route)
	);
};
