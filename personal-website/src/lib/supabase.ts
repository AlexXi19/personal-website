import { PUBLIC_SVELTE_APP_SUPABASE_ANON_KEY, PUBLIC_SVELTE_APP_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = PUBLIC_SVELTE_APP_SUPABASE_URL;
const supabaseAnonKey = PUBLIC_SVELTE_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
