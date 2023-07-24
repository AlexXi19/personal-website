import { z } from 'zod';

export const BlogSchema = z.object({
	metadata: z.object({
		title: z.string(),
		date: z.string(),
		live: z.boolean().optional()
	}),
	default: z.any()
});

export const CatalogSchema = z.object({
	meta: z.object({
		title: z.string(),
		date: z.string(),
		live: z.boolean().optional()
	}),
	path: z.string()
});

export type Catalog = z.infer<typeof CatalogSchema>;
