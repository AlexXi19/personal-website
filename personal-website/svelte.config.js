import adapter from '@sveltejs/adapter-node';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter({ out: 'build' })
	},
	preprocess: [
		sveltePreprocess({
			postcss: true
		}),
		mdsvex({
			extensions: ['.md'],
			layout: {
				blog: './src/lib/components/BlogLayout.svelte'
			}
		})
	]
};

export default config;
