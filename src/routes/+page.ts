import { supabase } from '$lib/supabase';
import type { definitions } from '$lib/types/supabase';
import type { Load } from '@sveltejs/kit';

async function getMessage(): Promise<string | undefined> {
	const { data, error } = await supabase.from<definitions['messages']>('messages').select('*');
	return data?.[0].text;
}

export const load: Load = async ({ params }) => {
	const message = await getMessage();
	return {
		message
	};
};
