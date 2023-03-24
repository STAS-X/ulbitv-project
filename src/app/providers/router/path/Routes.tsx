import { RouteProps } from 'react-router-dom';
import { AppAuthRoutes, AppRoutes } from 'shared/config/routeConfig/routeConfig';

export const routeConfig = (
	routes: Array<RouteProps & { name: AppRoutes | AppAuthRoutes; icon: React.VFC<React.SVGProps<SVGSVGElement>> }>
) => {
	return routes.map((route) => {
		return {
			[route.name]: {
				path: route.path,
				element: route.element,
				Icon: route.icon
			}
		};
	});
};
