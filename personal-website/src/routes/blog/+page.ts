import { CatalogSchema } from '$lib/types/post';
import type { Load } from '@sveltejs/kit';
import { z } from 'zod';

export const load: Load = async ({ fetch, setHeaders }) => {
	const response = await fetch(`/api/blog`);
	const posts = z.array(CatalogSchema).parse(await response.json());
	const livePosts = posts.filter((post) => post.meta.live !== false);

	// setHeaders({
	// 	age: '86400',
	// 	'cache-control': 'public, max-age=86400'
	// });

	return {
		posts: livePosts
	};
};

export const prerender = true;
