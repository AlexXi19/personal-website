export function isEmpty(obj: Object) {
	return Object.keys(obj).length === 0;
}

export function isoToDate(date: string) {
	return new Date(date).toLocaleDateString();
}
