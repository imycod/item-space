import App from './App.vue'
import router from "./router"

describe('<App />', {viewportHeight: 800, viewportWidth: 1200}, () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-vue
		cy.mount(<App/>, {
			globals: {
				plugins: [router],
			}
		})
		cy.validate(App.name)
	})
})