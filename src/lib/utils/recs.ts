import { supabase } from '$lib/supabase';
import type { definitions } from '$lib/types/supabase';

export async function getRecs() {
	const { data, error } = await supabase
		.from<definitions['recs']>('recs')
		.select('*')
		.match({ is_other: false })
		.order('created_at', { ascending: false });
	return data;
}

export async function getOtherRecs() {
	const { data, error } = await supabase
		.from<definitions['recs']>('recs')
		.select('*')
		.match({ is_other: true })
		.order('created_at', { ascending: false });
	return data;
}
