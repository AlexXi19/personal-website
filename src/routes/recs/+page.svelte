<script lang="ts">
	import RecList from '$lib/components/RecList.svelte';

	import type { definitions } from '$lib/types/supabase';
	import { isoToDate } from '$lib/utils/random';

	export let data;
	export let recs: definitions['recs'][] = data.recs;
	export let header = 'Software things I like:';
</script>

<RecList {recs} {header} />
