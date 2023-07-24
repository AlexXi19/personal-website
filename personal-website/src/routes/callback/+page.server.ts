import { redirect } from '@sveltejs/kit';
import type { Load } from '@sveltejs/kit';
import { spotifyApi } from '$lib/spotify';
import { upsertToken } from '$lib/utils/tokens';

export const load: Load = async ({ url }) => {
	const code = url.searchParams.get('code');
	if (code) {
		const data = await spotifyApi.authorizationCodeGrant(code);
		spotifyApi.setAccessToken(data.body['access_token']);
		spotifyApi.setRefreshToken(data.body['refresh_token']);
		const access_token = data.body['access_token'];
		const refresh_token = data.body['refresh_token'];
		await upsertToken(access_token, refresh_token);
	}
	throw redirect(307, '/');
};
