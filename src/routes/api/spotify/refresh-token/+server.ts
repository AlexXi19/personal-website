import { spotifyApi } from '$lib/spotify';

/** @type {import('./$types').RequestHandler} */
export async function POST() {
	console.log('Refreshing Token...');
	const data = await spotifyApi.refreshAccessToken();
	spotifyApi.setAccessToken(data.body['access_token']);
	return new Response('success');
}
