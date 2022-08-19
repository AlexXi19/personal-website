import { getAuthUrl } from '$lib/utils/spotify';
import type { Load } from '@sveltejs/kit';

export interface ILoadSpotifyPageData {
	authUrl: string;
}

export const load: Load = async ({ params }): Promise<ILoadSpotifyPageData> => {
	const authUrl = await getAuthUrl();

	return {
		authUrl
	};
};
