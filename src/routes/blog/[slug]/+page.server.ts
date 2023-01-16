import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ params, setHeaders }) => {
	const post = await import(`../blogs/${params.slug}.md`);
	const { title, date } = post.metadata;
	const content = post.default;

	// 2 days
	// setHeaders({
	// 	age: '172800',
	// 	'cache-control': 'public, max-age=172800'
	// });

	return {
		content,
		title,
		date
	};
};

export const prerender = 'auto';
