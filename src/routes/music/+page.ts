import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ setHeaders, fetch }) => {
	const res = await fetch(`/api/spotify/top`);
	const data = await res.json();

	// 2 days
	setHeaders({
		age: '172800',
		'cache-control': 'public, max-age=172800'
	});

	return data;
};
