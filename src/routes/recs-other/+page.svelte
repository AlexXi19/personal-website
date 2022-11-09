<script lang="ts">
	import type { definitions } from '$lib/types/supabase';
	import RecList from '$lib/components/RecList.svelte';
	export let data;
	export let recs: definitions['recs'][] = data.recs;
	export let header = 'Fun things I like:';
</script>

<div class=" p-12 pt-24 md:p-24">
	<RecList {recs} {header} />
</div>
