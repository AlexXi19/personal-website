import { spotifyApi } from '$lib/spotify';
import { upsertToken } from '$lib/utils/tokens';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	console.log('Refreshing Token...');
	const data = await spotifyApi.refreshAccessToken();
	spotifyApi.setAccessToken(data.body['access_token']);
	const access_token = data.body['access_token'];
	const refresh_token = spotifyApi.getRefreshToken();
	if (!refresh_token) {
		throw Error();
	}
	await upsertToken(access_token, refresh_token);
	return new Response('success');
}
