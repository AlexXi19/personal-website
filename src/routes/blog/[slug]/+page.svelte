<script lang="ts">
	export let data: any;
	// @ts-ignore
	import Readme from '../md/1.md';
</script>

<div class="mx-auto font-mono text-sm max-w-4xl">
	<article>
		<h1 class="font-bold text-3xl py-2">{data.title}</h1>
		<p class="py-2">Published: {data.date}</p>
		<Readme />
	</article>
</div>
