import { getPosts } from '$lib/utils/posts';
import { getRecs } from '$lib/utils/recs';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ url }) => {
	const posts = await getPosts();
	return { posts };
};
