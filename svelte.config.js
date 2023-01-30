// // import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-static';

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	kit: {
// 		adapter: adapter({
// 			// default options are shown. On some platforms
// 			// these options are set automatically — see below
// 			pages: 'build',
// 			assets: 'build',
// 			fallback: null,
// 			precompress: false,
// 			strict: true
// 		})
// 	}
// };

// export default config;

import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import { vitePreprocess } from '@sveltejs/kit/vite';

// const preprocessed = preprocess(mdsvex(mdsvexConfig));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md'],
	// preprocess: [preprocess(), mdsvex(mdsvexConfig)],
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
	// preprocess: preprocessed,
	kit: {
		adapter: adapter()
	}
};

export default config;
