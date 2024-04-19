import path from "path";
import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";

export default defineConfig({
  component: {
  	devServer: {
  		framework: 'vue',
  		bundler: 'vite',
  	},
  },
  e2e: {
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
