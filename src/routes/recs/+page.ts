import { getRecs } from '$lib/utils/recs';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ url, setHeaders }) => {
	const recs = await getRecs(0, 1000);

	setHeaders({
		age: '86400',
		'cache-control': 'public, max-age=86400'
	});

	return {
		recs
	};
};
