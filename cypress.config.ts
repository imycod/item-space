import path from "path";
import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";

export default defineConfig({
  component: {
  	devServer: {
  		framework: 'vue',
  		bundler: 'vite',
  	},
	  specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
	  defaultCommandTimeout: 1000
  },
  e2e: {
	  supportFile: 'cypress/support/e2e.js',
	  specPattern: 'cypress/e2e/**/*',
	  // baseUrl: 'http://localhost:8080/',
	  // experimentalStudio: true
    setupNodeEvents(on) {
      // on(
      //   "file:preprocessor",
      //   vitePreprocessor({
      //     configFile: path.resolve(__dirname, "./vite.config.ts"),
      //     mode: "development",
      //   })
      // );
    },
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
