import {listItems} from "./list-items.js";

function requireTruthy(propName, options) {
	const { componentName, state } = options.meta
	if (!options.testData[propName]) {
		throw new Error(
			`Cannot validate __${state}__ state of __${componentName}__ component without __${propName}__ prop.`
		)
	}
}
export const validators = {
	// BlockViewer: {},
	HelloWorld: {
		defaultRender(options) {
			// title is not static in HelloWorld so we need to get it from `options`
			const { title } = options.testData

			// if we don't have a title prop, throw an error and explain
			requireTruthy('title', options)

			// HelloWorld renders these headings itself, so we just do regular assertions
			cy.contains('h1', title).should('be.visible')
			cy.contains('h2', 'Installed CLI Plugins').should('be.visible')
			cy.contains('h2', 'Essential Links').should('be.visible')
			cy.contains('h2', 'Ecosystem').should('be.visible')

			// validate direct child HelloIntro, always pass `options` down
			cy.validate('HelloIntro', options)

			// we have the same list multiple places, but with different sets of items
			// pass in the expected array for each list, using `extendOptions` to merge
			// with options we are passing down
			cy.validate(
				'HelloList',
				extendOptions(options, { testData: { items: listItems.CLI } })
			)
			cy.validate(
				'HelloList',
				extendOptions(options, {
					testData: { items: listItems.essentialLinks },
				})
			)
			cy.validate(
				'HelloList',
				extendOptions(options, { testData: { items: listItems.ecosystem } })
			)

			// with no content, the list wrapper shouldn't render, so make sure that data-cy attribute is not found
			cy.getComponent('HelloList', {
				selector: 'data-cy="no-content-list"',
			}).should('not.exist')
		},
	}
}