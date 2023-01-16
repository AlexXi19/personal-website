export async function load({ params }: any) {
	const post = await import(`../blogs/${params.slug}.md`);
	const { title, date } = post.metadata;
	const content = post.default;

	return {
		content,
		title,
		date
	};
}

export const prerender = 'auto';
