import { supabase } from '$lib/supabase';
import type { definitions } from '$lib/types/supabase';
import { getCurrentTrack, getPreviousTracks } from '$lib/utils/spotify';
import { json } from '@sveltejs/kit';

async function getMessage(): Promise<string | undefined> {
	const { data, error } = await supabase.from<definitions['messages']>('messages').select('*');
	return data?.[0].text;
}

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const [message, currentTrack, previousTracks] = await Promise.all([
		getMessage(),
		getCurrentTrack(),
		getPreviousTracks(5)
	]);

	return json({
		message,
		currentTrack,
		previousTracks
	});
}
