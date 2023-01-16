import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ fetch, setHeaders }) => {
	const response = await fetch(`/api/blog`);
	const posts = await response.json();
	const livePosts = posts.filter((post: any) => post.meta.live !== false);

	setHeaders({
		age: '86400',
		'cache-control': 'public, max-age=86400'
	});

	return {
		posts: livePosts
	};
};

export const prerender = true;
