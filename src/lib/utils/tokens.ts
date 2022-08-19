import { supabase } from '$lib/supabase';
import type { definitions } from '$lib/types/supabase';

export async function upsertToken(access_token: string, refresh_token: string) {
	const { data, error } = await supabase
		.from<definitions['tokens']>('tokens')
		.upsert({ access_token, refresh_token }, { onConflict: 'refresh_token' });
}

export async function getToken() {
	const { data, error } = await supabase
		.from<definitions['tokens']>('tokens')
		.select('*')
		.order('created_at', { ascending: false })
		.limit(1);
	return data?.[0]!;
}
