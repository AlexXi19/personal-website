export function isEmpty(obj: Object) {
	return Object.keys(obj).length === 0;
}

export function isoToDate(date: string) {
	return new Date(date).toLocaleDateString();
}

export function daysSinceWebsiteStart() {
	const websiteStartTime = new Date('2022-08-19T04:25:03.929Z');
	const currentTime = new Date();
	const timeDiff = Math.abs(currentTime.getTime() - websiteStartTime.getTime());
	const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	return diffDays;
}
