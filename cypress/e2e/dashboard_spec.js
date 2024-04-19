describe('Dashboard', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000')
		cy.get('[data-cy=login-email]').type('')
		cy.get('[data-cy=login-password]').type('123456')
	})
})