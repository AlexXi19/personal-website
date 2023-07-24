<script lang="ts">
	import RecList from '$lib/components/RecList.svelte';
	import SubPageLayout from '$lib/components/SubPageLayout.svelte';
	export let data;
	export let recs = data.recs;
	export let header = 'Fun things I like:';
</script>

<SubPageLayout title="">
	<RecList {recs} {header} />
</SubPageLayout>
