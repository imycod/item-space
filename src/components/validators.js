import {App as AppConfig} from "../../cypress/common-validators"
function requireTruthy(propName, options) {
	const { componentName, state } = options.meta
	if (!options.testData[propName]) {
		throw new Error(
			`Cannot validate __${state}__ state of __${componentName}__ component without __${propName}__ prop.`
		)
	}
}
export const validators = {
	App:AppConfig,
	BlockViewer: {
		defaultRender(options) {
			console.log('defaultRender----',options);
		}
	},
	HelloWorld: {
		defaultRender(options) {
			console.log('defaultRender----',options);
		}
	}
}