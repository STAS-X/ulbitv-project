import { RoutePath } from '@/shared/config/routeConfig';

export const routeConfig = (/* isAuth: boolean */) => {
	return (
		Object.entries(RoutePath)
			//.filter(([key, route]) => route.isAuth === isAuth || route.isAuth === false || isAuth === undefined)
			.map(([, route]) => route)
	);
};
