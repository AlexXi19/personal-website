import { getRecs } from '$lib/utils/recs';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ url }) => {
	const recs = await getRecs();
	console.log(recs);
	return {
		recs
	};
};
