import { BlogSchema } from '$lib/types/post';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
	const post = BlogSchema.parse(await import(`../blogs/${params.slug}.md`));

	const { title, date } = post.metadata;

	// 2 days
	// setHeaders({
	// 	age: '172800',
	// 	'cache-control': 'public, max-age=172800'
	//

	return {
		component: post?.default,
		title,
		date
	};
};

export const prerender = 'auto';
