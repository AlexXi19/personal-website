import promClient, { collectDefaultMetrics, Counter } from 'prom-client';

export const register = new promClient.Registry();
register.setDefaultLabels({
	app: 'personal-website'
});

export const pageViewCounter = new Counter({
	name: 'personal_website_page_views',
	help: 'Number of page views for personal website',
	labelNames: ['path'],
	registers: [register]
});

pageViewCounter.inc({ path: '/' });

collectDefaultMetrics({ register });
