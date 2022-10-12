<script lang="ts">
	import type { Catalog } from '$lib/types/post';
	export let catalog: Catalog[];
</script>

<div class="mx-auto font-mono text-sm max-w-4xl">
	<h1 class="font-bold text-lg">Blog</h1>
	<div class="flex flex-col gap-3 py-5">
		{#each catalog as blog}
			<div class="flex flex-row gap-4 justify-between">
				<a href={`/${blog.path}`}>{blog.meta.title}</a>
				<div>
					<p class="text-right">{blog.meta.date}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
