import { getCurrentTrack, getPreviousTracks } from '$lib/utils/spotify';
import { json } from '@sveltejs/kit';

export async function GET() {
	const [currentTrack, previousTracks] = await Promise.all([
		getCurrentTrack(),
		getPreviousTracks(5)
	]);

	return json({
		// headers: {
		// 	'cache-control': 'public, max-age=240' // 4 mins
		// },
		body: {
			currentTrack,
			previousTracks
		}
	});
}
