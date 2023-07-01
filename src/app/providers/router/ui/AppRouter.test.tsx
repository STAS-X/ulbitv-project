import { AppRouter } from './AppRouter';
import { screen, waitFor } from '@testing-library/react';
import componentRender from '@/shared/lib/tests/componentRender/componentRender';
import {
	getRouteAbout,
	getRouteAdminPanel,
	getRouteMain,
	getRouteProfile
} from '@/shared/config/routeConfig/routeConfig';

const initialState = {
	user: {
		authData: {
			id: '1',
			username: '-XXX-',
			profileId: '1'
			//roles: ['user']
		},
		_loaded: true
	}
};

describe('app/router/AppRouter', () => {
	//beforeEach(async () => await waitFor(async () => componentRender(<AppRouter />, { route: '' })));
	// let container: HTMLDivElement;
	//const containerId = 'project-root';

	// afterEach(() => {
	// 	const container = document.getElementById(containerId);
	// 	if (container?.firstChild) {
	// 		//container.firstChild.remove();
	// 	}
	// });

	test('Проверка рендера страницы О проекте', async () => {
		await waitFor(async () => await componentRender(<AppRouter />, { route: getRouteAbout(), initialState }));

		const page = await screen.findByTestId('AboutPage');
		expect(page).toBeInTheDocument();
	});

	test('Редирект на Страница не найдена', async () => {
		await waitFor(async () => await componentRender(<AppRouter />, { route: '/notFoundTest', initialState }));

		const page = await screen.findByTestId('NotFoundPage');
		expect(page).toBeInTheDocument();
	});

	test('Главная страница', async () => {
		await waitFor(async () => await componentRender(<AppRouter />, { route: getRouteMain() }));

		const page = await screen.findByTestId('MainPage');
		expect(page).toBeInTheDocument();
	});

	test('Редирект на ForbiddenPage, если у пользователя нет доступа ', async () => {
		await waitFor(async () => await componentRender(<AppRouter />, { route: getRouteAdminPanel() }));

		const page = await screen.findByTestId('ForbiddenPage');
		expect(page).toBeInTheDocument();
	});

	test('Редирект на ForbiddenPage, если пользователь не авторизован ', async () => {
		await waitFor(async () => await componentRender(<AppRouter />, { route: getRouteProfile('1') }));

		const page = await screen.findByTestId('ForbiddenPage');
		expect(page).toBeInTheDocument();
	});

	test('Открытие админпанели для администратора ', async () => {
		await waitFor(
			async () =>
				await componentRender(<AppRouter />, {
					route: getRouteAdminPanel(),
					initialState: {
						...initialState,
						...{
							user: {
								authData: { roles: ['admin'] }
							}
						}
					}
				})
		);

		const page = await screen.findByTestId('AdminPage');
		expect(page).toBeInTheDocument();
	});

	test('Страница профиля пользователя после авторизации', async () => {
		await waitFor(
			async () =>
				await componentRender(<AppRouter />, {
					route: getRouteProfile('1'),
					initialState
				})
		);

		const page = await screen.findByTestId('ProfilePage');
		expect(page).toBeInTheDocument();
	});
});
