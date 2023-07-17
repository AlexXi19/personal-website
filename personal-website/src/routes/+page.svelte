<script lang="ts">
	import svelteLogo from '$lib/assets/svelte-logo.svg';
	import kubernetesLogo from '$lib/assets/kubernetes-logo.svg';
	import raspberryLogo from '$lib/assets/raspberry-logo.svg';
	import myPhoto from '$lib/assets/my-photo.jpeg';
	import { daysSinceWebsiteStart } from '$lib/utils/random';
	import SpotifyEmbed from '$lib/components/SpotifyEmbed.svelte';
	import { onMount } from 'svelte';
	let currentTrack: SpotifyApi.CurrentlyPlayingResponse | null = null;
	let mostRecentTrack: SpotifyApi.PlayHistoryObject | null = null;

	onMount(async () => {
		const res = await fetch(`${window.location.href}api/spotify/recent`);
		const data = (await res.json()).body;
		currentTrack = data.currentTrack;
		mostRecentTrack = data.previousTracks?.[0];
	});

	let daysSinceStart = daysSinceWebsiteStart();
</script>

<svelte:head>
	<title>Alex Xi</title>
	<meta name="robots" content="noindex nofollow" />
	<meta name="description" content="Alex Xi" />
	<html lang="en" />
</svelte:head>
<div class="max-w-4xl  p-12 pt-24 md:p-24 mx-auto font-mono flex flex-col gap-2">
	<h2 class="font-semibold">
		Welcome to Alex Xi's <a
			class="text-blue-400"
			href="https://github.com/AlexXi19/personal-website"
			target="_blank"
		>
			personal website
		</a>
	</h2>
	This website has been running for {daysSinceStart} days

	<img src={myPhoto} alt="Me" class="mt-2 w-60 rounded-md shadow-lg" />

	<h2 class="flex md:flex-row flex-col gap-1">
		Connect with me on
		<a
			class="text-blue-400 h-5 md:pl-2"
			href="https://www.linkedin.com/in/alex-xi-9a6527214/"
			target="”_blank”"
		>
			Linkedin</a
		>
		<a class="text-blue-400 h-5 md:pl-2" href="https://github.com/AlexXi19" target="_blank"
			>GitHub</a
		>
		<a class="text-blue-400 h-5 md:pl-2" href="https://twitter.com/alex2001314" target="_blank"
			>Twitter</a
		>
	</h2>

	<h1 class="font-bold text-xl mt-4">About Me</h1>
	<p>
		My name is Alex Xi and I just graduated from UC Berkeley with majors in Computer Science and
		Economics at UC Berkeley. I've had experience building fullstack applications for multiple
		startups and data pipelines for forecasting at Amazon Alexa. My current interests are in data
		related systems (ML/AI infra, database systems, and big data infrastructure) and large scale
		(microservice) applications.
	</p>
	<p class="py-2">
		In my free time, I like to browse around and learn about software engineering, here are
		<a class="text-blue-400" href="/work">some things I'm working on</a>
		and
		<a class="text-blue-400" href="/recs">some things that I'm reading</a>.
	</p>
	<div class="pt-2 font-bold h-[170px]">
		{#if currentTrack}
			<h2>
				{#if currentTrack.currently_playing_type === 'track'}
					I am currently listening to:
					<div class="py-2">
						<SpotifyEmbed spotifyLink={currentTrack?.item?.id} height={'156'} />
					</div>
				{:else if currentTrack.currently_playing_type === 'episode'}
					I am currently listening to a podcast
				{/if}
			</h2>
		{:else if mostRecentTrack}
			<h2>
				I was listening to:
				<div class="py-2">
					<SpotifyEmbed spotifyLink={mostRecentTrack?.track.id} height={'156'} />
				</div>
			</h2>
		{:else}
			Loading...
		{/if}
	</div>

	<br />
	<h2 class="flex flex-col gap-[10px]">
    <div class="flex flex-row items-center">
		Built with:
		<a href="https://svelte.dev/" target="_blank">
			<img src={svelteLogo} alt="Svelte" class="md:pb-0.5 h-5 md:pl-3" />
		</a>
    </div>
    <div class="flex flex-row items-center gap-1">
        Hosted on:
		<a href="https://kubernetes.io/" target="_blank">
			<img src={kubernetesLogo} alt="Svelte" class="md:pb-0.5 h-5 md:pl-3" />
		</a>
		<a href="https://www.raspberrypi.com/" target="_blank">
			<img src={raspberryLogo} alt="Vercel" class="md:pb-0.5 h-7 md:pl-3" />
		</a>
    </div>
	</h2>
</div>
