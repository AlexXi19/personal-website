import { supabase } from '$lib/supabase';
import type { definitions } from '$lib/types/supabase';

export async function getRecs() {
	const { data, error } = await supabase
		.from<definitions['recs']>('recs')
		.select('*')
		.order('created_at', { ascending: false });
	return data;
}
