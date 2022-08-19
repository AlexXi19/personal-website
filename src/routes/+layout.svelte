<script>
	import '../app.css';
	import { Transition } from '@rgossiaux/svelte-headlessui';
	import { Icon, Menu, X } from 'svelte-hero-icons';

	let isOpen = false;
</script>

<div class="h-12 w-12 ml-5 mt-5 bg-gray-100 rounded-lg absolute">
	<button on:click={() => (isOpen = !isOpen)}
		><Icon class="w-full text-gray-500 h-full p-1" src={Menu} solid />
	</button>
</div>

<Transition
	show={isOpen}
	enter="transform transition ease-in-out duration-300"
	enterFrom="-translate-x-full"
	enterTo="translate-x-0"
	leave="transform transition ease-in-out duration-300"
	leaveFrom="translate-x-0"
	leaveTo="-translate-x-full"
>
	<div class="w-60 h-screen shadow-md bg-white px-1 absolute">
		<button class="float-right mr-3 mt-3" on:click={() => (isOpen = !isOpen)}>
			<Icon src={X} class="w-6 h-6 text-gray-500" />
		</button>

		<ul class="mt-20 ">
			<li class="relative">
				<a
					class="flex items-center font-bold text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
					href="#!"
					data-mdb-ripple="true"
					data-mdb-ripple-color="dark"
				>
					Home
				</a>
			</li>
			<li class="relative">
				<a
					class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
					href="#!"
					data-mdb-ripple="true"
					data-mdb-ripple-color="dark">Stuff 1</a
				>
			</li>
			<li class="relative">
				<a
					class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
					href="#!"
					data-mdb-ripple="true"
					data-mdb-ripple-color="dark">Stuff 2</a
				>
			</li>
		</ul>
	</div>
</Transition>

<slot />
