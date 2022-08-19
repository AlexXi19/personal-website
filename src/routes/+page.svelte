<script lang="ts">
	import svelteLogo from '$lib/assets/svelte-logo.svg';
	import supabaseLogo from '$lib/assets/supabase-logo-wordmark--light.png';
	import tailwindLogo from '$lib/assets/Tailwind-CSS-logo.png';
	import vercelLogo from '$lib/assets/vercel-logotype-dark.png';
	import type { ILoadPageData } from './+page.server';
	import { daysSinceWebsiteStart } from '$lib/utils/random';
	export let data: ILoadPageData;
	let daysSinceStart = daysSinceWebsiteStart();
	let message = data.message;
	let currentTrack = data.currentTrack;
	console.log(currentTrack);
</script>

<div class="max-w-4xl font-mono flex flex-col gap-2">
	<h1 class="font-semibold">Alex's personal Website</h1>
	{#if message}
		<p>{message}</p>
	{/if}
	<h1 />
	<h1>
		This website has been running for <span class="font-bold">{daysSinceStart}</span> days.
	</h1>
	{#if currentTrack?.currently_playing_type === 'track'}
		Currently listening to:
		<a class="text-blue-400" href={String(currentTrack.item?.external_urls.spotify)} target="_blank"
			>{currentTrack?.item?.name} - {currentTrack.item?.artists[0].name}</a
		>
	{/if}
	{#if currentTrack?.currently_playing_type === 'episode'}
		Currently listening to a podcast
	{/if}
	<h2 class="flex md:flex-row flex-col gap-1">
		Connect with me on:
		<a
			class="text-blue-400 h-5 md:pl-3"
			href="https://www.linkedin.com/in/alex-xi-9a6527214/"
			target="”_blank”"
		>
			Linkedin</a
		>
		<a class="text-blue-400 h-5 md:pl-3" href="https://github.com/AlexXi19" target="_blank"
			>GitHub</a
		>
		<a class="text-blue-400 h-5 md:pl-3" href="https://twitter.com/alex2001314" target="_blank"
			>Twitter</a
		>
	</h2>
	<h2>
		<a class="text-blue-400" href="/recs">What I like</a>
	</h2>
	<h2 class="flex flex-col md:flex-row md:items-center items-start gap-[10px]">
		Built with:
		<a href="https://svelte.dev/" target="_blank">
			<img src={svelteLogo} alt="Svelte" class="md:pb-0.5 h-5 md:pl-3" />
		</a>
		<a href="https://supabase.com/" target="_blank">
			<img src={supabaseLogo} alt="Supabase" class="md:pb-0.5 h-5 md:pl-3" />
		</a>
		<a href="https://tailwindcss.com/" target="_blank">
			<img src={tailwindLogo} alt="Tailwind" class="md:pb-0.5 h-[13px] md:pl-3" />
		</a>
		<a href="https://vercel.com/" target="_blank">
			<img src={vercelLogo} alt="Vercel" class="md:pb-0.5 h-[15px] w-[65px] md:pl-3" />
		</a>
	</h2>
</div>
