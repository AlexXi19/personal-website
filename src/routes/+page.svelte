<script lang="ts">
	import svelteLogo from '$lib/assets/svelte-logo.svg';
	import supabaseLogo from '$lib/assets/supabase-logo-wordmark--light.png';
	import tailwindLogo from '$lib/assets/Tailwind-CSS-logo.png';
	import vercelLogo from '$lib/assets/vercel-logotype-dark.png';
	import myPhoto from '$lib/assets/my-photo.jpeg';
	import type { ILoadPageData } from './+page.server';
	import { daysSinceWebsiteStart } from '$lib/utils/random';

	export let data: ILoadPageData;

	let daysSinceStart = daysSinceWebsiteStart();
	let currentTrack = data.currentTrack;
	let mostRecentTrack = data.previousTracks?.[0];
</script>

<div class="max-w-4xl mx-auto font-mono flex flex-col gap-2">
	<h2 class="font-semibold">
		Welcome to Alex Xi's <a
			class="text-blue-400"
			href="https://github.com/AlexXi19/personal-website"
			target="_blank"
		>
			personal website
		</a>
	</h2>
	<img src={myPhoto} alt="Me" class="mt-2 h-[200px] w-[190px] rounded-md shadow-lg" />
	<h1 class="font-bold text-xl mt-4">About Me</h1>
	<h2>
		My name is Alex Xi and I am currently a senior studying Computer Science and Economics at UC
		Berkeley. I love building software and have worked on development for multiple startups. I just
		finished an internship with Amazon and I'm currently working on engineering and product for
		<a class="text-blue-400" href="https://instacoach.com" target="_blank">InstaCoach</a>. In my
		free time, I like to learn about software engineering, here are
		<a class="text-blue-400" href="/recs" sveltekit:prefetch>some things that I like</a>.
	</h2>
	<h2 class="mt-4">
		This website has been running for <span class="font-bold">{daysSinceStart}</span> days.
	</h2>
	{#if currentTrack}
		<h2>
			{#if currentTrack.currently_playing_type === 'track'}
				I am currently listening to:
				<a
					class="text-blue-400"
					href={String(currentTrack.item?.external_urls.spotify)}
					target="_blank">{currentTrack?.item?.name} - {currentTrack.item?.artists[0].name}</a
				>
			{:else if currentTrack.currently_playing_type === 'episode'}
				I am currently listening to a podcast
			{/if}
		</h2>
	{:else}
		<h2>
			I was listening to:
			<a class="text-blue-400" href={mostRecentTrack?.track.external_urls.spotify} target="_blank"
				>{mostRecentTrack?.track?.name} - {mostRecentTrack?.track?.artists[0].name}</a
			>
		</h2>
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
