import { defineConfig } from "cf/config";

export default defineConfig({
	worker: {
		name: "conteman-ui",
		compatibilityDate: "2026-11-10",
		assets: {
			notFoundHandling: "404-page",
		},
		domains: [
			"ui.conteman.com",
		],
	},
});
