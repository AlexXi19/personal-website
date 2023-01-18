<script lang="ts">
	import type { Catalog } from '$lib/types/post';
	export let catalog: Catalog[];
</script>

<div class="mx-auto font-mono text-sm ">
	<h1 class="font-bold text-lg">Blog</h1>
	<p class="italic text-xs pt-[1px]">Most of these will be unpolished!</p>

	<div class="flex flex-col gap-4 py-10">
		{#each catalog as blog}
			<div class="flex flex-row gap-6 justify-between">
				<a href={`/${blog.path}`}>{blog.meta.title}</a>
				<div>
					<p class="text-right">{blog.meta.date}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
