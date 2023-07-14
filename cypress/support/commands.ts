/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-function */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//Cypress.Commands.add('login', (email, password) => { });
//
//
// -- This is a child command --
//Cypress.Commands.add('drag', { prevSubject: 'element' }, (subject, options) => { });
//
//
// -- This is a dual command --
//Cypress.Commands.add('dismiss', { prevSubject: 'optional' }, (subject, options) => { });
//
//
// -- This will overwrite an existing command --
//Cypress.Commands.overwrite('visit', (originalFn, url, options) => { });

// -- Replace visit by window nativ relocation
// Cypress.Commands.add('winLocation', (url: string) => {
// 	cy.window().then((win) => {
// 		win.location.href = url;
// 	});
// });
//

// declare global {
// 	namespace Cypress {
// 		interface Chainable {
// 			login(email: string, password: string): Chainable<void>;
// 			drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
// 			dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
// 			visit(originalFn: CommandOriginalFn<any>, url: string, options: Partial<VisitOptions>): Chainable<Element>;
// 		}
// 	}
// }

import * as helpers from './common/helpers';
import * as login from './common/login';
import * as profile from './common/profile';
import * as requests from './common/requests';

Cypress.Commands.addAll(helpers);
Cypress.Commands.addAll(login);
Cypress.Commands.addAll(profile);
Cypress.Commands.addAll(requests);

export {};
