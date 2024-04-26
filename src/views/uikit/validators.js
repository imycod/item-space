import {listItems} from './list-items'
import {App as AppConfig} from "../../../cypress/common-validators"
//

/*
Structure of validators object is:
{
    [ComponentName]: {
        [StateValidatorFunction](options) {
            // assert the validity of the state
            // based on expected static values and dynamic values from `options`

            // these assertions are scoped to locate elements
            // *within the data-cy-component selector for that component*

            // `options.component` will let the validator access the component's
            // outermost layer itself
        }
    }
}
*/

export const validators = {
	App: AppConfig,
	Button: {
		defaultRender(options) {
			console.log('options---', options)
		},
	},
}

// helpers

function validLinkFormat(href) {
	return href.startsWith('/') || href.startsWith('#') || href.startsWith('http')
}

function requireTruthy(propName, options) {
	const {componentName, state} = options.meta
	if (!options.testData[propName]) {
		throw new Error(
			`Cannot validate __${state}__ state of __${componentName}__ component without __${propName}__ prop.`
		)
	}
}

function extendOptions(optionsObject, objectToMerge) {
	const optsClone = Cypress._.cloneDeep(optionsObject)
	return Cypress._.merge(optsClone, objectToMerge)
}