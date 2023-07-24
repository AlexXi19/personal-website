<script lang="ts">
	import BlogPost from '$lib/components/BlogPost.svelte';
	export let data;
</script>

<div class="mx-auto text-sm max-w-5xl">
	<BlogPost {data} />
</div>
