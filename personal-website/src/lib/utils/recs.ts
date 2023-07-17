import { supabase } from '$lib/supabase';
import type { definitions } from '$lib/types/supabase';

interface ReadwiseBookResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: ReadwiseBook[];
}

interface ReadwiseBook {
	id: number;
	title: string;
	author: string;
	category: string;
	source: string;
	num_highlights: number;
	last_highlight_at: string;
	updated: string;
	cover_image_url: string;
	highlights_url: string;
	source_url: string | null;
	asin: string;
	tags: string[];
}

export interface Read {
	title: string;
	source: string;
	time: string;
	type: string;
	cover?: string;
}
// @source: https://readwise.io/api_deets
interface ReadwiseSearchParams {
	page_size?: number;
	page?: number;
	category?: string;
	source?: string;
	num_highlights?: number;
	num_highlights__lt?: number;
	num_highlights__gt?: number;
	updated__lt?: string;
	updated__gt?: string;
	last_highlight_at__lt?: string;
	last_highlight_at__gt?: string;
}

export async function getReadwiseReads(opts: ReadwiseSearchParams): Promise<Read[]> {
	const searchParams = new URLSearchParams(opts as Record<string, string>);

	const res = await fetch('https://readwise.io/api/v2/books?' + searchParams, {
		headers: {
			Authorization: 'Token ' + import.meta.env.VITE_READWISE_TOKEN
		}
	});
	const data: ReadwiseBookResponse = await res.json();

	return data.results.map((book) => {
		return {
			title: book.title,
			source: book.source_url || '404',
			time: book.last_highlight_at,
			type: convertType(book.category),
			cover: book.cover_image_url
		};
	});
}

function convertType(type: string) {
	switch (type) {
		case 'books':
			return 'Book';
		case 'articles':
			return 'Article';
		case 'tweets':
			return 'Tweet';
		case 'supplementals':
			return 'Supplemental';
		case 'podcasts':
			return 'Podcast';
		default:
			return 'Other';
	}
}

export async function getSupabaseReads(): Promise<Read[]> {
	const { data, error } = await supabase
		.from<definitions['recs']>('recs')
		.select('*')
		.match({ is_other: false })
		.order('created_at', { ascending: false });
	if (error || data === null) {
		return [];
	}

	return data.map((rec) => {
		return {
			title: rec.title,
			source: rec.href,
			time: rec.created_at,
			type: rec.type || 'Other'
		};
	});
}

// Get recs with pagination sorted by time
export async function getRecs(pageNum: number, pageSize: number): Promise<Read[]> {
	const [readwiseReads, supabaseReads] = await Promise.all([
		getReadwiseReads({
			page_size: 100
		}),
		getSupabaseReads()
	]);
	const res = readwiseReads.concat(supabaseReads);

	return res
		.sort((a, b) => {
			return new Date(b.time).getTime() - new Date(a.time).getTime();
		})
		.slice(pageNum * pageSize, (pageNum + 1) * pageSize);
}

export async function getOtherRecs(): Promise<Read[]> {
	const { data, error } = await supabase
		.from<definitions['recs']>('recs')
		.select('*')
		.match({ is_other: true })
		.order('created_at', { ascending: false });

	if (error || data === null) {
		return [];
	}

	return data?.map((rec) => {
		return {
			title: rec.title,
			source: rec.href,
			time: rec.created_at,
			type: rec.type || 'Other'
		};
	});
}
