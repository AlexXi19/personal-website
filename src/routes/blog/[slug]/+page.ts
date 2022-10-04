import type { BlogPost } from '$lib/types/post';

export async function load({ params }: { params: { slug: string } }) {
	const post = await import(`../md/${params.slug}.md`);
	const { title, date } = post.metadata as BlogPost;
	const content = post.default;

	return {
		content,
		title,
		date
	};
}
