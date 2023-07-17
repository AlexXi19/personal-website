<script lang="ts">
	import BlogCatalog from '$lib/components/BlogCatalog.svelte';
	import SubPageLayout from '$lib/components/SubPageLayout.svelte';
	import type { Catalog } from '$lib/types/post';

	export let data: { posts: Catalog[] };
</script>

<SubPageLayout>
	<BlogCatalog catalog={data.posts} />
</SubPageLayout>
