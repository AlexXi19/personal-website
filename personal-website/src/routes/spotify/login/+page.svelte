<script lang="ts">
	import type { ILoadSpotifyPageData } from './+page.server';

	export let data: ILoadSpotifyPageData;
	let authorizeURL = data.authUrl;
</script>

<a href={authorizeURL}> Spotify Login </a>
