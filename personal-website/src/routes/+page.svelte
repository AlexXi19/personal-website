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
<div class="bg-black min-h-screen text-dark-gray">
	<div
		class="max-w-4xl p-8 pt-10 md:p-12 md:pt-40 mx-auto flex flex-col gap-2 font-source-sans-pro text-sm font-semibold"
	>
		<h1 class="text-2xl">Alex Xi</h1>
		<h2>
			Welcome to my <a
				class="text-secondary"
				href="https://github.com/AlexXi19/personal-website"
				target="_blank"
			>
				personal website,
			</a>
			this website has been running for
			{daysSinceStart}
			days.
		</h2>

		<img src={myPhoto} alt="Me" class="mt-2 w-32 md:w-60 rounded-md shadow-lg" />

		<h2 class="flex md:flex-row flex-col gap-1">
			Connect with me on
			<a
				class="text-secondary h-5 md:pl-2"
				href="https://www.linkedin.com/in/alex-xi-9a6527214/"
				target="”_blank”"
			>
				Linkedin</a
			>
			<a class="text-secondary h-5 md:pl-2" href="https://github.com/AlexXi19" target="_blank"
				>GitHub</a
			>
			<a class="text-secondary h-5 md:pl-2" href="https://twitter.com/alex2001314" target="_blank"
				>X (Twitter)</a
			>
		</h2>

		<h1 class="font-semibold text-xl mt-4">About Me</h1>
		<div class="leading-relaxed">
			<p>
				My name is Alex Xi and I just graduated with majors in Computer Science and Economics at UC
				Berkeley. My current experience and interests are in ML Infra and Platform Engineering.
			</p>
			<p class="py-2">
				I work on Software & Startups. Here's
				<a class="text-secondary" href="https://notes.alexxi.dev" target="_blank"
					>things I'm working on</a
				>
				and
				<a class="text-secondary" href="/recs">things that I'm reading</a>.
			</p>
		</div>
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
			<div class="flex flex-row items-center gap-2">
				Built with:
				<a href="https://svelte.dev/" target="_blank">
					<img src={svelteLogo} alt="Svelte" class="md:pb-0.5 h-5 md:pl-3" />
				</a>
			</div>
			<div class="flex flex-row items-center gap-2">
				Hosted on:
				<a href="https://kubernetes.io/" target="_blank">
					<img src={kubernetesLogo} alt="Svelte" class="md:pb-0.5 h-5 md:pl-3" />
				</a>
				<a href="https://www.raspberrypi.com/" target="_blank">
					<img src={raspberryLogo} alt="Vercel" class="md:pb-0.5 h-6 md:pl-3" />
				</a>
			</div>
		</h2>
	</div>
</div>
