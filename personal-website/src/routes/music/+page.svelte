<script lang="ts">
	import MusicGallery from '$lib/components/MusicGallery.svelte';

	export let data;
</script>

<svelte:head>
	<title>Music | Alex's personal website</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>
<div class="bg-dark p-20 min-h-screen text-white">
	<div class="block lg:hidden">
		<MusicGallery {data} items={3} />
	</div>
	<div class="hidden lg:inline">
		<MusicGallery {data} items={9} />
	</div>
</div>
