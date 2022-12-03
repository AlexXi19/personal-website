<script lang="ts">
	import RecList from '$lib/components/RecList.svelte';
	import SubPageLayout from '$lib/components/SubPageLayout.svelte';
	import type { definitions } from '$lib/types/supabase';

	export let data;
	export let recs: definitions['recs'][] = data.recs;
	export let header = 'Software things I like:';
</script>

<SubPageLayout title="">
	<RecList {recs} {header} />
</SubPageLayout>
