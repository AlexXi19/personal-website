import SpotifyWebApi from 'spotify-web-api-node';
import { getToken } from './utils/tokens';

declare global {
	var spotifyApi: SpotifyWebApi;
}
// credentials are optional

const { access_token, refresh_token } = await getToken();

function getSpotifyApi() {
	return new SpotifyWebApi({
		clientId: import.meta.env.VITE_SPOTIPY_CLIENT_ID,
		clientSecret: import.meta.env.VITE_SPOTIPY_CLIENT_SECRET,
		redirectUri: import.meta.env.VITE_SPOTIPY_REDIRECT_URI,
		accessToken: access_token,
		refreshToken: refresh_token
	});
}

export const spotifyApi =
	import.meta.env.MODE === 'development'
		? global.spotifyApi ?? (global.spotifyApi = getSpotifyApi())
		: getSpotifyApi();
