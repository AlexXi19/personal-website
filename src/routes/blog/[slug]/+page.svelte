<script lang="ts">
	export let data: any;
	import BlogPost from '$lib/components/BlogPost.svelte';
</script>

<div class="mx-auto text-sm max-w-5xl">
	<BlogPost {data} />
</div>
