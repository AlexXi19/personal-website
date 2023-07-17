<script lang="ts">
	import type { definitions } from '$lib/types/supabase';
	export let post: definitions['posts'];
</script>

<div
	class="p-8 w-[300px] md:w-[480px] h-fit border-gray-50 border-[1px] hover:scale-105 ease-in duration-100 transition rounded-lg shadow-lg"
>
	<h1 class="text-sm font-bold">{post.title}</h1>
	<h2 class="text-sm">{post.body}</h2>
</div>
