import { getAuthUrl } from '$lib/utils/spotify';
import { getToken } from '$lib/utils/tokens';
import type { Load } from '@sveltejs/kit';

export interface ILoadSpotifyPageData {
	authUrl: string;
}

export const load: Load = async (): Promise<ILoadSpotifyPageData> => {
	const authUrl = await getAuthUrl();

	const token = await getToken();
	spotifyApi.setAccessToken(token.access_token);

	return {
		authUrl
	};
};
