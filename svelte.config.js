import adapter from "@sveltejs/adapter-static";
import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const config = {
	extensions: [".svelte", ".svx", ".md"],
	preprocess: [
		vitePreprocess({
			postcss: true
		}),
		mdsvex(mdsvexConfig)
	],
	kit: {
		adapter: adapter(),
		prerender: {
			entries: ["*", "/sitemap.xml", "/rss.xml", "/blog/categories/all?page=1"]
		}
	}
};

export default config;
