import { spotifyApi } from '$lib/spotify';
import { error, redirect } from '@sveltejs/kit';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ url }) => {
	const code = url.searchParams.get('code');
	if (code) {
		const data = await spotifyApi.authorizationCodeGrant(code);
		spotifyApi.setAccessToken(data.body['access_token']);
		spotifyApi.setRefreshToken(data.body['refresh_token']);
	}
	throw redirect(307, '/');
};
