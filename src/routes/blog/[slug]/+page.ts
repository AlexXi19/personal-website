import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
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
