<script lang="ts">
	export let title: string = '';
</script>

<div class="bg-black text-white">
	<div class="min-h-screen p-12 max-w-4xl mx-auto">
		<h2 class="flex md:flex-row text-xl font-bold flex-col gap-[6px] pb-4">{title}</h2>
		<slot />
	</div>
</div>
