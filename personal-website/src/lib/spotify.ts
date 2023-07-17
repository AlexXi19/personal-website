import { PUBLIC_SPOTIPY_CLIENT_ID, PUBLIC_SPOTIPY_CLIENT_SECRET, PUBLIC_SPOTIPY_REDIRECT_URI } from '$env/static/public';
import SpotifyWebApi from 'spotify-web-api-node';
import { getToken } from './utils/tokens';

declare global {
	var spotifyApi: SpotifyWebApi;
}
// credentials are optional

const { access_token, refresh_token } = await getToken();

function getSpotifyApi() {
	return new SpotifyWebApi({
		clientId: PUBLIC_SPOTIPY_CLIENT_ID,
		clientSecret: PUBLIC_SPOTIPY_CLIENT_SECRET,
		redirectUri: PUBLIC_SPOTIPY_REDIRECT_URI,
		accessToken: access_token,
		refreshToken: refresh_token
	});
}

export const spotifyApi =
	import.meta.env.MODE === 'development'
		? global.spotifyApi ?? (global.spotifyApi = getSpotifyApi())
		: getSpotifyApi();
