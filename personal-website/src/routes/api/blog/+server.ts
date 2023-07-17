import { json } from '@sveltejs/kit';

export const GET = async () => {
	const allPosts = await fetchMarkdownPosts();

	const sortedPosts = allPosts.sort((a, b) => {
		return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
	});

	return json(sortedPosts);
};

const fetchMarkdownPosts = async () => {
	const allPostFiles = import.meta.glob('/src/routes/blog/blogs/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as any;

			return {
				meta: metadata,
				path: path.replace('/src/routes/blog/blogs/', 'blog/').replace('.md', '')
			};
		})
	);

	return allPosts;
};
