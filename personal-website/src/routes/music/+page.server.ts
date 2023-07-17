import { getTopArtists, getTopTracks } from '$lib/utils/spotify';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ setHeaders }) => {
	const { tracks } = await getTopTracks(10);
	const { artists } = await getTopArtists(10);

	// 2 days
	setHeaders({
		age: '172800',
		'cache-control': 'public, max-age=172800'
	});

	return {
		tracks,
		artists
	};
};
