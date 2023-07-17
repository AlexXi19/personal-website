import { getTopArtists, getTopTracks } from '$lib/utils/spotify';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const { tracks } = await getTopTracks(10);
	const { artists } = await getTopArtists(10);

	return json({
		tracks,
		artists
	});
}
