import { spotifyApi } from '$lib/spotify';
import { isEmpty } from './random';

enum SpotifyTimeRange {
	SHORT_TERM = 'short_term',
	MEDIUM_TERM = 'medium_term',
	LONG_TERM = 'long_term'
}

export async function getCurrentTrack() {
	try {
		const currentTrack = (await spotifyApi.getMyCurrentPlayingTrack()).body;
		if (isEmpty(currentTrack)) {
			return null;
		}
		return currentTrack;
	} catch {
		return null;
	}
}

export async function getTopTracks(num: number) {
	const tracks = await spotifyApi.getMyTopTracks({
		limit: num,
		time_range: SpotifyTimeRange.SHORT_TERM
	});
	return { tracks: tracks.body.items };
}

export async function getTopArtists(num: number) {
	const artists = await spotifyApi.getMyTopArtists({
		limit: num,
		time_range: SpotifyTimeRange.SHORT_TERM
	});
	return { artists: artists.body.items };
}

export async function getPreviousTracks(num: number) {
	try {
		const previousTracks = (await spotifyApi.getMyRecentlyPlayedTracks({ limit: num })).body.items;
		if (isEmpty(previousTracks)) {
			return null;
		}
		return previousTracks;
	} catch (e) {
		console.log('Error getting previous tracks', e);
		return null;
	}
}

export async function getAuthUrl() {
	const scope = [
		'user-read-recently-played',
		'user-read-playback-position',
		'user-modify-playback-state',
		'user-read-playback-state',
		'user-top-read',
		'app-remote-control',
		'user-read-private',
		'streaming',
		'user-read-currently-playing',
		'playlist-read-collaborative',
		'playlist-modify-public',
		'playlist-read-private',
		'playlist-modify-private'
	];
	return spotifyApi.createAuthorizeURL(scope, 'random-state');
}
