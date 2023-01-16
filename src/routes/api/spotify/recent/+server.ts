import { supabase } from '$lib/supabase';
import type { definitions } from '$lib/types/supabase';
import { getCurrentTrack, getPreviousTracks } from '$lib/utils/spotify';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const [currentTrack, previousTracks] = await Promise.all([
		getCurrentTrack(),
		getPreviousTracks(5)
	]);

	return json({
		headers: {
			'cache-control': 'public, max-age=240' // 4 mins
		},
		body: {
			currentTrack,
			previousTracks
		}
	});
}
