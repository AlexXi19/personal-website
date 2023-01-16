<script lang="ts">
	// import GeneralObserver from './general-observer.svelte';
	// @source https://github.com/spences10/sveltekit-embed/blob/main/src/lib/components/spotify.svelte

	export let spotifyLink: string = '';
	export let width: string = '100%';
	export let height: string | null = null;
	export let theme = '';
	// export let broswer = '';
</script>

<!-- <GeneralObserver {height} {width}> -->
<!-- svelte-ignore a11y-missing-attribute -->
<div class="">
	<iframe
		style="border-radius:12px"
		src={`https://open.spotify.com/embed/track/${spotifyLink}?utm_source=generator&theme=${theme}`}
		{width}
		height={height || '356'}
		allowfullscreen={false}
		allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
	/>
</div>
