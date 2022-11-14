<script lang="ts">
	import { page } from '$app/stores';

	import '../app.css';
	import { fly, slide } from 'svelte/transition';
	import { Icon, Menu, X } from 'svelte-hero-icons';
	let isOpen = false;
</script>

<div class="h-12 w-12 ml-5 mt-5 bg-gray-100 rounded-lg absolute">
	<button on:click={() => (isOpen = !isOpen)}
		><Icon class="w-full text-gray-500 h-full p-1" src={Menu} solid />
	</button>
</div>

{#if isOpen}
	<div
		class="w-60 h-screen shadow-md bg-white px-1 absolute"
		transition:fly={{ x: -250, opacity: 1 }}
	>
		<button class="float-right mr-3 mt-3" on:click={() => (isOpen = !isOpen)}>
			<Icon src={X} class="w-6 h-6 text-gray-500" />
		</button>

		<ul class="mt-20" on:click={() => (isOpen = !isOpen)}>
			<li class="relative">
				<a
					data-sveltekit-prefetch
					class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
					href="/"
					data-mdb-ripple="true"
					data-mdb-ripple-color="dark"
				>
					Home
				</a>
			</li>
			<!-- <li class="relative">
				<a
					data-sveltekit-prefetch
					class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
					href="/spotify"
					data-mdb-ripple="true"
					data-mdb-ripple-color="dark">Spotify</a
				>
			</li> -->
			<!-- <li class="relative">
				<a
					data-sveltekit-prefetch
					class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
					href="/posts"
					data-mdb-ripple="true"
					data-mdb-ripple-color="dark">Posts</a
				>
			</li> -->
			<li class="relative">
				<a
					data-sveltekit-prefetch
					class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
					href="/blog"
					data-mdb-ripple="true"
					data-mdb-ripple-color="dark">Blog</a
				>
			</li>
			<li class="relative">
				<a
					data-sveltekit-prefetch
					class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
					href="/recs"
					data-mdb-ripple="true"
					data-mdb-ripple-color="dark">Software Recs</a
				>
			</li>
			<li class="relative">
				<a
					data-sveltekit-prefetch
					class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
					href="/music"
					data-mdb-ripple="true"
					data-mdb-ripple-color="dark">Music</a
				>
			</li>
			<li class="relative">
				<a
					data-sveltekit-prefetch
					class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
					href="/recs-other"
					data-mdb-ripple="true"
					data-mdb-ripple-color="dark">Fun Recs</a
				>
			</li>
		</ul>
	</div>
{/if}
<div class="mx-auto text-sm md:text-lg">
	<slot />
</div>
