import SpotifyWebApi from 'spotify-web-api-node';

// credentials are optional
export const spotifyApi = new SpotifyWebApi({
	clientId: import.meta.env.VITE_SPOTIPY_CLIENT_ID,
	clientSecret: import.meta.env.VITE_SPOTIPY_CLIENT_SECRET,
	redirectUri: import.meta.env.VITE_SPOTIPY_REDIRECT_URI
});
