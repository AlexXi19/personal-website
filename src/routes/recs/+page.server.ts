import { getRecs } from '$lib/utils/recs';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ setHeaders }) => {
	const recs = await getRecs(0, 1000);

	setHeaders({
		age: '86400',
		'cache-control': 'public, max-age=86400'
	});

	return {
		recs
	};
};
