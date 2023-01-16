import { getOtherRecs } from '$lib/utils/recs';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ setHeaders }) => {
	const recs = await getOtherRecs();

	setHeaders({
		age: '172800',
		'cache-control': 'public, max-age=172800'
	});

	return {
		recs
	};
};
