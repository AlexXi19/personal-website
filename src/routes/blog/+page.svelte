<script lang="ts">
	import BlogCatalog from '$lib/components/BlogCatalog.svelte';
	import type { Catalog } from '$lib/types/post';

	export let data: { posts: Catalog[] };
</script>

<BlogCatalog catalog={data.posts} />
