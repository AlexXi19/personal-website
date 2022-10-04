import type { BlogPost, Catalog } from '$lib/types/post';
import glob from 'glob';

export function getBlogs() {
	return glob.sync('*.md', { cwd: 'src/routes/blog/md' });
}

export async function getCatalog(files: string[]) {
	const catalogPromise = files
		.map(async (file) => {
			const slug = file?.split('.')[0];
			const post = await import(`./md/${slug}.md`);
			const { title, date } = post.metadata as BlogPost;
			return {
				slug,
				title,
				date
			};
		})
		.filter(Boolean);
	return await Promise.all(catalogPromise);
}

export async function load(): Promise<{ catalog: Catalog[] }> {
	const blogs = getBlogs();
	const catalog = await getCatalog(blogs);

	return { catalog };
}
