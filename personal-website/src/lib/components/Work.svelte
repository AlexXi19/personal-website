<script lang="ts">
	// import GeneralObserver from './general-observer.svelte';
	// @source https://github.com/spences10/sveltekit-embed/blob/main/src/lib/components/spotify.svelte

	export let title: string = '';
	export let description: string | undefined = undefined;
	export let href = '';
	export let timeStarted = '';
</script>

<div class="flex justify-between h-full hover:text-blue-800">
	<a {href} class="text-blue-400 h-fit w-[85%]" target="_blank"
		>{title}
		{#if description}
			<p class="text-sm">{description}</p>
		{/if}
	</a>
	{#if timeStarted}
		<span class="text-black">({timeStarted})</span>
	{/if}
</div>
