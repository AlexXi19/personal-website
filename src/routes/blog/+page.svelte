<script lang="ts">
	import BlogCatalog from '$lib/components/BlogCatalog.svelte';
	import type { Catalog } from '$lib/types/post';

	export let data: { posts: Catalog[] };
</script>

<div class=" p-12 pt-24 md:p-24">
	<BlogCatalog catalog={data.posts} />
</div>
