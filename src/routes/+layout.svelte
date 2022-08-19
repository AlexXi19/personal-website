<script>
	import '../app.css';
</script>

<div class="flex flex-row">
	<div class="w-60 h-screen shadow-md bg-white px-1">
		<ul class="relative mt-20">
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
	<div class="mt-20">
		<slot />
	</div>
</div>
