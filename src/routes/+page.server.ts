import { supabase } from '$lib/supabase';
import type { definitions } from '$lib/types/supabase';
import type { Load } from '@sveltejs/kit';
import { getAuthUrl, getCurrentTrack, getPreviousTracks } from '$lib/utils/spotify';

async function getMessage(): Promise<string | undefined> {
	const { data, error } = await supabase.from<definitions['messages']>('messages').select('*');
	return data?.[0].text;
}
export interface ILoadPageData {
	message: string | undefined;
	currentTrack: SpotifyApi.CurrentlyPlayingResponse | null;
	previousTracks: SpotifyApi.PlayHistoryObject[] | null;
}

export const load: Load = async ({ params }): Promise<ILoadPageData> => {
	const [message, currentTrack, previousTracks] = await Promise.all([
		getMessage(),
		getCurrentTrack(),
		getPreviousTracks(5)
	]);

	return {
		message,
		currentTrack,
		previousTracks
	};
};
