export const load = async ({ fetch }: any) => {
	const response = await fetch(`/api/blog`);
	const posts = await response.json();
	const livePosts = posts.filter((post: any) => post.meta.live !== false);
	return {
		posts: livePosts
	};
};

export const prerender = true;
