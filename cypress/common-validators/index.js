export const App ={
	defaultRender(options) {
		console.log(options);
		// on the new route, OtherPlace view should be visible now
		// but we don't need to check the whole tree, just check
		// that the page-level components we expect are present or not
		cy.getComponent('Cypress').should('be.visible')

		// go back to home page
		cy.contains('Home').click()

	},
}