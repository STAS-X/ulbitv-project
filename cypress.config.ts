import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// 	// implement node event listeners here
		},
		baseUrl: "http://localhost:3000/",
		retries: {
			runMode: 2,
			openMode: 0,
		},
		pageLoadTimeout: 40000,
		defaultCommandTimeout: 15000,
		chromeWebSecurity: false,
		experimentalSkipDomainInjection: ["localhost"],
		//testIsolation: true,
		//experimentalWebKitSupport: true
	},

	component: {
		devServer: {
			framework: "react",
			bundler: "webpack",
		},
	},
});
