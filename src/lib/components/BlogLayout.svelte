<script>
	// @ts-nocheck
	export let title;
	export let date;
</script>

<div class="p-12 pt-24 md:p-24">
	<div class="font-semibold py-2 text-5xl">{title}</div>

	<div>
		<article>
			<div class="flex flex-row items-center justify-between">
				<p class="py-2">Published: {date}</p>
				<a href="/blog">View all blog posts</a>
			</div>
			<slot />
		</article>
	</div>
</div>

<style>
	div :global(*) {
		font-weight: 400;
		line-height: 1.7;
	}

	div :global(img) {
		max-width: 100%;
		margin-top: 15px;
		margin-bottom: 15px;
	}

	div :global(h1),
	div :global(h2),
	div :global(h3) {
		font-weight: 400;
		margin-top: 12px;
	}

	div :global(h1) {
		font-size: 30px;
		border-bottom: 1px solid #ccc;
		margin-bottom: 10px;
	}

	div :global(h2) {
		font-size: 27px;
		margin-top: 10px;
	}

	div :global(h3) {
		font-size: 21px;
	}

	div :global(a) {
		font-weight: 500;
		color: #007bff;
	}

	div :global(a:hover) {
		color: #0056b3;
		text-decoration: underline;
	}

	div :global(pre) {
		background-color: #f8f8f8;
		border: 1px solid #ccc;
		padding: 10px;
		margin-bottom: 10px;
		margin-top: 10px;
		overflow-x: auto;
		contain: content;
	}

	div :global(code) {
		font-family: monospace;
		background-color: #f8f8f8;
	}

	div :global(strong) {
		font-weight: 720;
	}

	div :global(ul) {
		list-style-type: circle;
		margin-left: 10px;
	}

	div :global(ol) {
		list-style-type: decimal;
		margin-left: 10px;
	}

	div :global(ol > li) {
		margin-left: 10px;
	}

	div :global(ul > li) {
		margin-left: 10px;
	}

	div :global(ul > li > ul) {
		list-style-type: square;
	}

	div :global(ul > li > ul > li) {
		margin-left: 10px;
	}

	div :global(ul > li > ul > li > ul) {
		list-style-type: disc;
	}

	div :global(ul > li > ul > li > ul > li) {
		margin-left: 10px;
	}
</style>
