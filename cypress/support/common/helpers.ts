const getByTestId = (testId: string) => {
	return cy.get(`[data-testid="${testId}"]`, { timeout: 10000 });
};

const checkClassList = (expectedClasses: string[]) => {
	return ($el: ArrayLike<any>) => {
		//cy.window().then((win) => win.console.warn($el[0].classList, 'get classes from element'));
		const classList: string[] = Array.from($el[0].classList);
		return expectedClasses.every((expectedClass: string) =>
			classList.some((inClass: string) => inClass.startsWith(expectedClass) || inClass.search(expectedClass) > -1)
		);
	};
};

declare global {
	namespace Cypress {
		interface Chainable {
			getByTestId(testId: string): ReturnType<typeof getByTestId>;
			checkClassList(expectedClasses: string[]): boolean;
		}
	}
}

export { getByTestId, checkClassList };
