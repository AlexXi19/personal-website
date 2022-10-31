import { getOtherRecs } from '$lib/utils/recs';
import type { Load } from '@sveltejs/kit';

export interface ILoadPageData {
	message: string | undefined;
	currentTrack: SpotifyApi.CurrentlyPlayingResponse | null;
	previousTracks: SpotifyApi.PlayHistoryObject[] | null;
}

export const load: Load = async ({ url, fetch }): Promise<ILoadPageData> => {
	const res = await fetch(`/api/spotify/recent`);
	const data = await res.json();

	return data;
};
