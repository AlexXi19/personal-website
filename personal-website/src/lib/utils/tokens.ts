import { supabase } from '$lib/supabase';
import type { definitions } from '$lib/types/supabase';

export async function upsertToken(access_token: string, refresh_token: string) {
	await supabase
		.from<definitions['tokens']>('tokens')
		.upsert({ access_token, refresh_token }, { onConflict: 'refresh_token' });
}

export async function getToken() {
	const { data } = await supabase
		.from<definitions['tokens']>('tokens')
		.select('*')
		.order('created_at', { ascending: false })
		.limit(1);

	const res = data?.[0];
	if (!res) {
		throw new Error('No token found');
	}
	return res;
}
