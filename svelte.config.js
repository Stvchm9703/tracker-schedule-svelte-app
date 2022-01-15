import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { optimizeImports } from 'carbon-preprocess-svelte';
/** @type {import('@sveltejs/kit').Config} */
import path from 'path';

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	// preprocess: preprocess(),
	preprocess: [preprocess()],
	css: (css) => css.write('public/bundle.css'),

	kit: {
		adapter: adapter({
			page: 'build',
			assets: 'build',
			fallback: '200.html'
		}),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			resolve: {
				alias: {
					// '~': resolve('./src')
					$components: path.resolve('src/components'),
					$utils: path.resolve('src/utils'),
					$libs: path.resolve('src/libs'),
					$stores: path.resolve('src/stores'),
					$actions: path.resolve('src/actions')
				}
			}
		}
	}
	// aliases: {
	// 	// '~': resolve('./src')
	// 	'$components': resolve('src/components')
	// }
};

export default config;
