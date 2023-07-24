<script lang="ts">
	import BlogCatalog from '$lib/components/BlogCatalog.svelte';
	import SubPageLayout from '$lib/components/SubPageLayout.svelte';

	export let data;
</script>

<SubPageLayout>
	<BlogCatalog catalog={data.posts} />
</SubPageLayout>
