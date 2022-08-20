import { getOtherRecs } from '$lib/utils/recs';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ url }) => {
	const recs = await getOtherRecs();
	return {
		recs
	};
};
