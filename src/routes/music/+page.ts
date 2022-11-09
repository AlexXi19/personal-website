import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ url, fetch }) => {
	const res = await fetch(`/api/spotify/top`);
	const data = await res.json();
	return data;
};
