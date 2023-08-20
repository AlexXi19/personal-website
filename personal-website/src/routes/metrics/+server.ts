import { register } from '$lib/prometheus';

export const GET = async () => {
	const metrics = await register.metrics();
	const options: ResponseInit = {
		status: 200,
		headers: {
			'Content-Type': register.contentType
		}
	};

	return new Response(metrics, options);
};
