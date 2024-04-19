import Button from './Button.vue'

describe('<Button />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Button)
  })
})