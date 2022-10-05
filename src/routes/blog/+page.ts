export const load = async ({ fetch }: any) => {
	const response = await fetch(`/api/blog`);
	const posts = await response.json();

	return {
		posts
	};
};
