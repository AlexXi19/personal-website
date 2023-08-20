import { pageViewCounter } from '$lib/prometheus';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname;
	if (event.request.method === 'GET' && !path.startsWith('/api')) {
		console.log('Request received for path: ' + path);
		pageViewCounter.inc({ path });
	}
	const response = await resolve(event);
	return response;
};
