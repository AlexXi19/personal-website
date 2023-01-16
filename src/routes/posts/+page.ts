import { getPosts } from '$lib/utils/posts';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ url }) => {
	const posts = await getPosts();
	return { posts };
};
