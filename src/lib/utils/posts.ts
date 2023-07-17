import { supabase } from '$lib/supabase';
import type { definitions } from '$lib/types/supabase';

export async function getPosts() {
	// Get posts from supabase
	const { data, error } = await supabase.from<definitions['posts']>('posts').select('*');

	if (error) {
		return [];
	}

	return data || [];
}
