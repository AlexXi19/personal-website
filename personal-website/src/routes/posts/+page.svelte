<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	import PostInput from '$lib/components/PostInput.svelte';
	import type { definitions } from '$lib/types/supabase';

	export let data;
	export let posts: definitions['posts'][] = data.posts;
</script>

<div class="flex flex-col mx-auto max-w-4xl items-center gap-10 font-mono">
	{#each posts as post}
		<Post {post} />
		<Post {post} />
	{/each}
	<PostInput />
</div>
