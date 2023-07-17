/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
	'/': {
		get: {
			responses: {
				/** OK */
				200: unknown;
			};
		};
	};
	'/messages': {
		get: {
			parameters: {
				query: {
					id?: parameters['rowFilter.messages.id'];
					created_at?: parameters['rowFilter.messages.created_at'];
					text?: parameters['rowFilter.messages.text'];
					/** Filtering Columns */
					select?: parameters['select'];
					/** Ordering */
					order?: parameters['order'];
					/** Limiting and Pagination */
					offset?: parameters['offset'];
					/** Limiting and Pagination */
					limit?: parameters['limit'];
				};
				header: {
					/** Limiting and Pagination */
					Range?: parameters['range'];
					/** Limiting and Pagination */
					'Range-Unit'?: parameters['rangeUnit'];
					/** Preference */
					Prefer?: parameters['preferCount'];
				};
			};
			responses: {
				/** OK */
				200: {
					schema: definitions['messages'][];
				};
				/** Partial Content */
				206: unknown;
			};
		};
		post: {
			parameters: {
				body: {
					/** messages */
					messages?: definitions['messages'];
				};
				query: {
					/** Filtering Columns */
					select?: parameters['select'];
				};
				header: {
					/** Preference */
					Prefer?: parameters['preferReturn'];
				};
			};
			responses: {
				/** Created */
				201: unknown;
			};
		};
		delete: {
			parameters: {
				query: {
					id?: parameters['rowFilter.messages.id'];
					created_at?: parameters['rowFilter.messages.created_at'];
					text?: parameters['rowFilter.messages.text'];
				};
				header: {
					/** Preference */
					Prefer?: parameters['preferReturn'];
				};
			};
			responses: {
				/** No Content */
				204: never;
			};
		};
		patch: {
			parameters: {
				query: {
					id?: parameters['rowFilter.messages.id'];
					created_at?: parameters['rowFilter.messages.created_at'];
					text?: parameters['rowFilter.messages.text'];
				};
				body: {
					/** messages */
					messages?: definitions['messages'];
				};
				header: {
					/** Preference */
					Prefer?: parameters['preferReturn'];
				};
			};
			responses: {
				/** No Content */
				204: never;
			};
		};
	};
	'/tokens': {
		get: {
			parameters: {
				query: {
					created_at?: parameters['rowFilter.tokens.created_at'];
					access_token?: parameters['rowFilter.tokens.access_token'];
					refresh_token?: parameters['rowFilter.tokens.refresh_token'];
					/** Filtering Columns */
					select?: parameters['select'];
					/** Ordering */
					order?: parameters['order'];
					/** Limiting and Pagination */
					offset?: parameters['offset'];
					/** Limiting and Pagination */
					limit?: parameters['limit'];
				};
				header: {
					/** Limiting and Pagination */
					Range?: parameters['range'];
					/** Limiting and Pagination */
					'Range-Unit'?: parameters['rangeUnit'];
					/** Preference */
					Prefer?: parameters['preferCount'];
				};
			};
			responses: {
				/** OK */
				200: {
					schema: definitions['tokens'][];
				};
				/** Partial Content */
				206: unknown;
			};
		};
		post: {
			parameters: {
				body: {
					/** tokens */
					tokens?: definitions['tokens'];
				};
				query: {
					/** Filtering Columns */
					select?: parameters['select'];
				};
				header: {
					/** Preference */
					Prefer?: parameters['preferReturn'];
				};
			};
			responses: {
				/** Created */
				201: unknown;
			};
		};
		delete: {
			parameters: {
				query: {
					created_at?: parameters['rowFilter.tokens.created_at'];
					access_token?: parameters['rowFilter.tokens.access_token'];
					refresh_token?: parameters['rowFilter.tokens.refresh_token'];
				};
				header: {
					/** Preference */
					Prefer?: parameters['preferReturn'];
				};
			};
			responses: {
				/** No Content */
				204: never;
			};
		};
		patch: {
			parameters: {
				query: {
					created_at?: parameters['rowFilter.tokens.created_at'];
					access_token?: parameters['rowFilter.tokens.access_token'];
					refresh_token?: parameters['rowFilter.tokens.refresh_token'];
				};
				body: {
					/** tokens */
					tokens?: definitions['tokens'];
				};
				header: {
					/** Preference */
					Prefer?: parameters['preferReturn'];
				};
			};
			responses: {
				/** No Content */
				204: never;
			};
		};
	};
	'/recs': {
		get: {
			parameters: {
				query: {
					id?: parameters['rowFilter.recs.id'];
					created_at?: parameters['rowFilter.recs.created_at'];
					title?: parameters['rowFilter.recs.title'];
					href?: parameters['rowFilter.recs.href'];
					type?: parameters['rowFilter.recs.type'];
					is_other?: parameters['rowFilter.recs.is_other'];
					/** Filtering Columns */
					select?: parameters['select'];
					/** Ordering */
					order?: parameters['order'];
					/** Limiting and Pagination */
					offset?: parameters['offset'];
					/** Limiting and Pagination */
					limit?: parameters['limit'];
				};
				header: {
					/** Limiting and Pagination */
					Range?: parameters['range'];
					/** Limiting and Pagination */
					'Range-Unit'?: parameters['rangeUnit'];
					/** Preference */
					Prefer?: parameters['preferCount'];
				};
			};
			responses: {
				/** OK */
				200: {
					schema: definitions['recs'][];
				};
				/** Partial Content */
				206: unknown;
			};
		};
		post: {
			parameters: {
				body: {
					/** recs */
					recs?: definitions['recs'];
				};
				query: {
					/** Filtering Columns */
					select?: parameters['select'];
				};
				header: {
					/** Preference */
					Prefer?: parameters['preferReturn'];
				};
			};
			responses: {
				/** Created */
				201: unknown;
			};
		};
		delete: {
			parameters: {
				query: {
					id?: parameters['rowFilter.recs.id'];
					created_at?: parameters['rowFilter.recs.created_at'];
					title?: parameters['rowFilter.recs.title'];
					href?: parameters['rowFilter.recs.href'];
					type?: parameters['rowFilter.recs.type'];
					is_other?: parameters['rowFilter.recs.is_other'];
				};
				header: {
					/** Preference */
					Prefer?: parameters['preferReturn'];
				};
			};
			responses: {
				/** No Content */
				204: never;
			};
		};
		patch: {
			parameters: {
				query: {
					id?: parameters['rowFilter.recs.id'];
					created_at?: parameters['rowFilter.recs.created_at'];
					title?: parameters['rowFilter.recs.title'];
					href?: parameters['rowFilter.recs.href'];
					type?: parameters['rowFilter.recs.type'];
					is_other?: parameters['rowFilter.recs.is_other'];
				};
				body: {
					/** recs */
					recs?: definitions['recs'];
				};
				header: {
					/** Preference */
					Prefer?: parameters['preferReturn'];
				};
			};
			responses: {
				/** No Content */
				204: never;
			};
		};
	};
	'/posts': {
		get: {
			parameters: {
				query: {
					id?: parameters['rowFilter.posts.id'];
					created_at?: parameters['rowFilter.posts.created_at'];
					title?: parameters['rowFilter.posts.title'];
					body?: parameters['rowFilter.posts.body'];
					author?: parameters['rowFilter.posts.author'];
					live?: parameters['rowFilter.posts.live'];
					/** Filtering Columns */
					select?: parameters['select'];
					/** Ordering */
					order?: parameters['order'];
					/** Limiting and Pagination */
					offset?: parameters['offset'];
					/** Limiting and Pagination */
					limit?: parameters['limit'];
				};
				header: {
					/** Limiting and Pagination */
					Range?: parameters['range'];
					/** Limiting and Pagination */
					'Range-Unit'?: parameters['rangeUnit'];
					/** Preference */
					Prefer?: parameters['preferCount'];
				};
			};
			responses: {
				/** OK */
				200: {
					schema: definitions['posts'][];
				};
				/** Partial Content */
				206: unknown;
			};
		};
		post: {
			parameters: {
				body: {
					/** posts */
					posts?: definitions['posts'];
				};
				query: {
					/** Filtering Columns */
					select?: parameters['select'];
				};
				header: {
					/** Preference */
					Prefer?: parameters['preferReturn'];
				};
			};
			responses: {
				/** Created */
				201: unknown;
			};
		};
		delete: {
			parameters: {
				query: {
					id?: parameters['rowFilter.posts.id'];
					created_at?: parameters['rowFilter.posts.created_at'];
					title?: parameters['rowFilter.posts.title'];
					body?: parameters['rowFilter.posts.body'];
					author?: parameters['rowFilter.posts.author'];
					live?: parameters['rowFilter.posts.live'];
				};
				header: {
					/** Preference */
					Prefer?: parameters['preferReturn'];
				};
			};
			responses: {
				/** No Content */
				204: never;
			};
		};
		patch: {
			parameters: {
				query: {
					id?: parameters['rowFilter.posts.id'];
					created_at?: parameters['rowFilter.posts.created_at'];
					title?: parameters['rowFilter.posts.title'];
					body?: parameters['rowFilter.posts.body'];
					author?: parameters['rowFilter.posts.author'];
					live?: parameters['rowFilter.posts.live'];
				};
				body: {
					/** posts */
					posts?: definitions['posts'];
				};
				header: {
					/** Preference */
					Prefer?: parameters['preferReturn'];
				};
			};
			responses: {
				/** No Content */
				204: never;
			};
		};
	};
}

export interface definitions {
	messages: {
		/**
		 * Format: uuid
		 * @description Note:
		 * This is a Primary Key.<pk/>
		 * @default extensions.uuid_generate_v4()
		 */
		id: string;
		/**
		 * Format: timestamp with time zone
		 * @default now()
		 */
		created_at?: string;
		/** Format: text */
		text?: string;
	};
	tokens: {
		/**
		 * Format: timestamp with time zone
		 * @default now()
		 */
		created_at?: string;
		/** Format: text */
		access_token: string;
		/**
		 * Format: text
		 * @description Note:
		 * This is a Primary Key.<pk/>
		 * @default extensions.uuid_generate_v4()
		 */
		refresh_token: string;
	};
	recs: {
		/**
		 * Format: uuid
		 * @description Note:
		 * This is a Primary Key.<pk/>
		 * @default extensions.uuid_generate_v4()
		 */
		id: string;
		/**
		 * Format: timestamp with time zone
		 * @default now()
		 */
		created_at: string;
		/** Format: text */
		title: string;
		/** Format: text */
		href: string;
		/** Format: text */
		type?: string;
		/**
		 * Format: boolean
		 * @default false
		 */
		is_other: boolean;
	};
	posts: {
		/**
		 * Format: uuid
		 * @description Note:
		 * This is a Primary Key.<pk/>
		 * @default extensions.uuid_generate_v4()
		 */
		id: string;
		/**
		 * Format: timestamp with time zone
		 * @default now()
		 */
		created_at?: string;
		/** Format: text */
		title: string;
		/** Format: text */
		body: string;
		/** Format: text */
		author: string;
		/**
		 * Format: boolean
		 * @default true
		 */
		live: boolean;
	};
}

export interface parameters {
	/**
	 * @description Preference
	 * @enum {string}
	 */
	preferParams: 'params=single-object';
	/**
	 * @description Preference
	 * @enum {string}
	 */
	preferReturn: 'return=representation' | 'return=minimal' | 'return=none';
	/**
	 * @description Preference
	 * @enum {string}
	 */
	preferCount: 'count=none';
	/** @description Filtering Columns */
	select: string;
	/** @description On Conflict */
	on_conflict: string;
	/** @description Ordering */
	order: string;
	/** @description Limiting and Pagination */
	range: string;
	/**
	 * @description Limiting and Pagination
	 * @default items
	 */
	rangeUnit: string;
	/** @description Limiting and Pagination */
	offset: string;
	/** @description Limiting and Pagination */
	limit: string;
	/** @description messages */
	'body.messages': definitions['messages'];
	/** Format: uuid */
	'rowFilter.messages.id': string;
	/** Format: timestamp with time zone */
	'rowFilter.messages.created_at': string;
	/** Format: text */
	'rowFilter.messages.text': string;
	/** @description tokens */
	'body.tokens': definitions['tokens'];
	/** Format: timestamp with time zone */
	'rowFilter.tokens.created_at': string;
	/** Format: text */
	'rowFilter.tokens.access_token': string;
	/** Format: text */
	'rowFilter.tokens.refresh_token': string;
	/** @description recs */
	'body.recs': definitions['recs'];
	/** Format: uuid */
	'rowFilter.recs.id': string;
	/** Format: timestamp with time zone */
	'rowFilter.recs.created_at': string;
	/** Format: text */
	'rowFilter.recs.title': string;
	/** Format: text */
	'rowFilter.recs.href': string;
	/** Format: text */
	'rowFilter.recs.type': string;
	/** Format: boolean */
	'rowFilter.recs.is_other': string;
	/** @description posts */
	'body.posts': definitions['posts'];
	/** Format: uuid */
	'rowFilter.posts.id': string;
	/** Format: timestamp with time zone */
	'rowFilter.posts.created_at': string;
	/** Format: text */
	'rowFilter.posts.title': string;
	/** Format: text */
	'rowFilter.posts.body': string;
	/** Format: text */
	'rowFilter.posts.author': string;
	/** Format: boolean */
	'rowFilter.posts.live': string;
}

export interface operations {}

export interface external {}
