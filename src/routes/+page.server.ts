import { supabase } from '$lib/supabase';
import type { definitions } from '$lib/types/supabase';
import type { Load } from '@sveltejs/kit';
import { getAuthUrl, getCurrentTrack } from '$lib/utils/spotify';

async function getMessage(): Promise<string | undefined> {
	const { data, error } = await supabase.from<definitions['messages']>('messages').select('*');
	return data?.[0].text;
}
export interface ILoadPageData {
	message: string | undefined;
	currentTrack: SpotifyApi.CurrentlyPlayingResponse | null;
}

export const load: Load = async ({ params }): Promise<ILoadPageData> => {
	const [message, currentTrack] = await Promise.all([getMessage(), getCurrentTrack()]);

	return {
		message,
		currentTrack
	};
};
