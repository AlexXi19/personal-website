export interface BlogPost {
	title: string;
	date: string;
	content: string;
}

export interface Catalog {
	meta: {
		title: string;
		date: string;
	};
	path: string;
}
