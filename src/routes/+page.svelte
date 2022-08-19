<script lang="ts">
	import svelteLogo from '$lib/assets/svelte-logo.svg';
	import supabaseLogo from '$lib/assets/supabase-logo-wordmark--light.png';
	import type { ILoadPageData } from './+page.server';

	export let data: ILoadPageData;
	let message = data.message;
	let currentTrack = data.currentTrack;
</script>

<div class="max-w-4xl font-mono flex flex-col gap-2">
	<h1 class="font-semibold">Alex's personal Website</h1>
	{#if message}
		<p>{message}</p>
	{/if}
	{#if currentTrack}
		Currently listening to:
		<a class="text-blue-400" href={String(currentTrack.item?.external_urls.spotify)} target="_blank"
			>{currentTrack?.item?.name} - {currentTrack.item?.artists[0].name}</a
		>
	{/if}
	<h2 class="flex flex-row">
		Connect with me on:
		<a
			class="text-blue-400 h-5 pl-3"
			href="https://www.linkedin.com/in/alex-xi-9a6527214/"
			target="”_blank”"
		>
			Linkedin</a
		>
		<a class="text-blue-400 h-5 pl-3" href="https://github.com/AlexXi19" target="”_blank”">GitHub</a
		>
	</h2>
	<h2 class="flex flex-row items-center">
		Built with:
		<img src={svelteLogo} alt="Svelte" class="pb-0.5 h-5 pl-3" />
		<img src={supabaseLogo} alt="Supabase" class="pb-0.5 h-5 pl-3" />
	</h2>
</div>
