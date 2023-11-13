<script lang="ts">
	import { isoToDate } from '$lib/utils/random';
	import type { Read } from '$lib/utils/recs';
	import { paginate, DarkPaginationNav } from 'svelte-paginate';
	const pageSize = 15;

	function populatePagination() {
		return paginate<Read>({ items: recs, pageSize, currentPage });
	}

	export let currentPage = 1;
	export let recs: Read[];
	export let header: string;
	export let paginatedItems = populatePagination();

	function handleSetPage(e: any) {
		currentPage = e.detail.page;
		paginatedItems = populatePagination();
	}
</script>

<div
	class="font-source-sans-pro text-sm max-w-4xl flex flex-col justify-between h-full font-semibold"
>
	<div class="">
		<a class="text-dark-gray" href="/"> Back </a>
		<h1 class="font-bold text-lg pb-2 pt-4">{header}</h1>
		<div class="flex flex-col gap-3 py-5">
			{#each paginatedItems as rec}
				<div class="flex flex-row gap-4 justify-between md:h-[45px] h-full font-normal">
					<a class="text-secondary" target="_blank" href={rec.source}>{rec.title}</a>
					<div>
						<p class="text-right">{rec.type}</p>
						<p class="text-right">{isoToDate(rec.time)}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="h-1/2 pt-5">
		<DarkPaginationNav
			totalItems={recs.length}
			{pageSize}
			{currentPage}
			limit={1}
			showStepOptions={true}
			on:setPage={handleSetPage}
		/>
	</div>
</div>
