<script lang="ts">
	export let data: any;
	import '../../../lib/style/blog-styles.css';
</script>

<div class="mx-auto text-sm max-w-5xl">
	<article>
		<h1 class="font-semibold py-2 text-5xl">{data.title}</h1>
		<div class="flex flex-row justify-between">
			<p class="py-2">Published: {data.date}</p>
			<a href="/blog">View all blog posts</a>
		</div>
		<svelte:component this={data.content} />
	</article>
</div>

<style>
	/* Write your CSS here */
</style>
