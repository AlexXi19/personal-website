<script lang="ts">
	import type { definitions } from '$lib/types/supabase';
	import { isoToDate } from '$lib/utils/random';

	export let data;
	let recs: definitions['recs'][] = data.recs;
</script>

<div class="font-mono text-sm">
	<h1 class="font-bold text-lg">Things I've enjoyed:</h1>
	<div class="flex flex-col gap-3 py-5">
		{#each recs as rec}
			<div class="flex flex-row gap-4 justify-between">
				<a class="text-blue-400" target="_blank" href={rec.href}>{rec.title}</a>
				<div>
					<p class="text-right">{rec.type}</p>
					<p class="text-right">{isoToDate(rec.created_at)}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
