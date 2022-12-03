<script lang="ts">
	import type { definitions } from '$lib/types/supabase';
	import { isoToDate } from '$lib/utils/random';
	export let recs: definitions['recs'][];
	export let header: string;
</script>

<div class="font-mono text-sm max-w-4xl">
	<h1 class="font-bold text-lg">{header}</h1>
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
