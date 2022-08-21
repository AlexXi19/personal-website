<script>
	import { ChevronRight, Icon, X } from 'svelte-hero-icons';
</script>

<div>
	<label for="message" class="block mb-2 text-sm">Write a post</label>

	<div class=" shadow-lg rounded-lg">
		<div class="flex flex-row justify-between text-gray-500 mr-4">
			<input class="w-full focus:outline-none text-sm rounded-lg p-2.5" placeholder="Your title" />
			<Icon src={X} class="w-6 h-6 text-gray-500" />
		</div>
		<textarea
			id="message"
			rows="4"
			class="w-[330px] md:w-[500px] h-[200px] focus:outline-none block p-2.5 text-sm resize-none border-gray-50 border-[1px]"
			placeholder="Your message"
		/>
		<div class="flex flex-row justify-between text-gray-500 mr-4">
			<input class="w-full focus:outline-none text-sm rounded-lg p-2.5" placeholder="Your name" />
			<button class="flex flex-row items-center gap-1">
				<p class="text-md">Send</p>
				<Icon src={ChevronRight} class="h-5 w-5" />
			</button>
		</div>
	</div>
</div>
