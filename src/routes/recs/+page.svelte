<script lang="ts">
	import type { definitions } from '$lib/types/supabase';

	export let data;
	let recs: definitions['recs'][] = data.recs;
</script>

<div class="font-mono">
	<h1>Things I've enjoyed:</h1>

	<div class="flex flex-col mt-2 gap-3">
		{#each recs as rec}
			<div class="flex flex-row gap-4 items-center">
				<a class="text-blue-400" href={rec.href}>{rec.title}</a>
				<p>{rec.type}</p>
			</div>
		{/each}
	</div>
</div>
