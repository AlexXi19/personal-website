<script lang="ts">
	import svelteLogo from '$lib/assets/svelte-logo.svg';
	import supabaseLogo from '$lib/assets/supabase-logo-wordmark--light.png';
	import type { ILoadSpotifyPageData } from './+page.server';

	export let data: ILoadSpotifyPageData;
	let authorizeURL = data.authUrl;
</script>

<a href={authorizeURL}> Spotify Login </a>
