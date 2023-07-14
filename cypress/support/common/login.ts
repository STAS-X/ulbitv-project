/// <reference types="cypress" />

import { UserData } from '../../../src/entities/User';

const USER_LS_KEY = 'user';

const toConsole = (message?: any, ...optionalParams: any[]) => {
	cy.window().then((win) => {
		win.console.log(message, ...optionalParams);
	});
};

const logIn = (username?: string, password?: string) => {
	return cy
		.request('POST', 'http://localhost:8000/login', {
			username: username || 'testuser',
			password: password || '123'
		})
		.then((response) => {
			//cy.get('@getUserData').should((response) => {
			// response.body is automatically serialized into JSON
			const userData = response.body;
			if (userData) {
				cy.window().then((win) => win.localStorage.setItem(USER_LS_KEY, JSON.stringify(userData ?? '')));
				toConsole(
					`${userData.username} login success`,
					response.status,
					response.statusText,
					userData,
					'user logIn success'
				);
			}
			return cy.wrap(userData);
		});
};

const logOut = () => {
	cy.window().then((win) => {
		const userData: Record<string, string> = !!win.localStorage.getItem(USER_LS_KEY)
			? JSON.parse(win.localStorage.getItem(USER_LS_KEY) as string)
			: {};
		if (userData && 'username' in userData) {
			win.localStorage.setItem(USER_LS_KEY, JSON.stringify(''));
			toConsole(`${userData.username} user logOut success`);
			// Перехоим на главную страницу после выхода из профиля
			cy.visit('/');
		}
	});
};

declare global {
	namespace Cypress {
		export interface Chainable {
			logIn(username?: string, password?: string): Chainable<UserData>;
			logOut(): void;
			toConsole(message?: any, ...optionalParams: any[]): void;
		}
	}
}

export { logIn, logOut, toConsole };
