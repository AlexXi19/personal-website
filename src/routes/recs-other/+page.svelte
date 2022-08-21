<script lang="ts">
	import type { definitions } from '$lib/types/supabase';
	import RecList from '$lib/components/recList.svelte';
	export let data;
	export let recs: definitions['recs'][] = data.recs;
	export let header = 'Fun things I like:';
</script>

<RecList {recs} {header} />
