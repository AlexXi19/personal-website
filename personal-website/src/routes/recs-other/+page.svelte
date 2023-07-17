<script lang="ts">
	import RecList from '$lib/components/RecList.svelte';
	import SubPageLayout from '$lib/components/SubPageLayout.svelte';
	import type { Read } from '$lib/utils/recs';
	export let data;
	export let recs: Read[] = data.recs;
	export let header = 'Fun things I like:';
</script>

<SubPageLayout title="">
	<RecList {recs} {header} />
</SubPageLayout>
