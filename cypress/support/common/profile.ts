const checkOptionFromSelect = (selectorTest: string, optionValue: string, isExist: boolean = true) => {
	let countrySelector;

	if (isExist) {
		countrySelector = cy.getByTestId(`${selectorTest}.ListBox`);
		countrySelector
			.getByTestId(`${selectorTest}.Trigger`)
			.as('Trigger')
			.click()
			.getByTestId(`${selectorTest}.Options`)
			.find(`[role="option"]:contains("${optionValue}")`)
			.click();
		return cy.get('@Trigger').eq(0);
	} else {
		countrySelector = cy.getByTestId(`${selectorTest}.ListBox`);
		countrySelector
			.getByTestId(`${selectorTest}.Trigger`)
			.as('Trigger')
			.click()
			.getByTestId(`${selectorTest}.Options`)
			.find(`[role="option"]:contains("${optionValue}")`)
			.should('not.exist');
		return cy.get('@Trigger').click().eq(0);
	}
};

export { checkOptionFromSelect };
