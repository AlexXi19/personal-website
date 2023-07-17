<script lang="ts">
	import ArtistCard from '$lib/components/ArtistCard.svelte';
	import SpotifyEmbed from '$lib/components/SpotifyEmbed.svelte';

	interface TracksArtists {
		tracks: SpotifyApi.TrackObjectFull[];
		artists: SpotifyApi.ArtistObjectFull[];
	}

	export let data: TracksArtists;
	export let items: number = 9;
</script>

<div class="max-w-5xl mx-auto pt-5 text-white font-thin  tracking-wide">
	<h1 class="text-2xl sm:text-5xl text-center sm:tracking-wider">What I'm Listening To</h1>

	<h2 class="text-xl  pt-2 sm:text-3xl md:py-8 md:pt-16 text-center">My Top Artists This Month</h2>
	<div class="mx-auto place-items-center grid grid-cols-1 lg:grid-cols-3  rounded-lg">
		{#each data.artists.slice(0, items) as artist}
			<div class="py-6">
				<ArtistCard
					name={artist.name}
					href={artist.external_urls.spotify}
					img={artist.images[0].url}
				/>
				<!-- <ArtistEmbed spotifyLink={artist.id} size="compact" /> -->
			</div>
		{/each}
	</div>

	<h2 class="text-xl pt-2 sm:text-4xl md:py-8 md:pt-16 pb-8 sm:pb-0  text-center">
		My Top Tracks This Month
	</h2>
	<div class="mx-auto place-items-center grid grid-cols-1 lg:grid-cols-3  rounded-lg">
		{#each data.tracks.slice(0, items) as track}
			<div class="">
				<!-- <SongCard
				name={track.name}
				href={track.external_urls.spotify}
				img={track.album.images[0].url}
				artist={track.artists[0].name}
			/> -->
				<SpotifyEmbed spotifyLink={track.id} width="320" height="400" theme="0" />
			</div>
		{/each}
	</div>
</div>
