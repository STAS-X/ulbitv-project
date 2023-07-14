declare global {
	namespace Cypress {
		export interface Chainable {
			env(): Partial<EnvKeys>;
			env<T extends keyof EnvKeys>(key: T): EnvKeys[T];
			env<T extends keyof EnvKeys>(key: T, val: EnvKeys[T]): void;
			env(object: Partial<EnvKeys>): void;
		}
	}
}

interface EnvKeys {
	['articles']: Array<{ articleId: string | number }>,
	['articleId']: { articleId: string },
	['comments']: Array<{ commentId: string | number }>,
	['users']: Array<{ userId: string | number, username?: string }>,
}

export { };
