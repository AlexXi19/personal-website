import { spotifyApi } from '$lib/spotify';
import { isEmpty } from './random';

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
