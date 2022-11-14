<script lang="ts">
	export let name: string;
	export let href: string;
	export let img: string;
	export let artist: string;
</script>

<!-- Playlist -->
<a class="flex border-gray-200  hover:bg-gray-100" {href} target="_blank">
	<!-- Image -->
	<img
		class="w-[150px] flex-shrink-0 aspect-square object-cover p-4 rounded-sm"
		src={img}
		alt={name}
	/>
	<div class="p-3 w-8 flex-shrink-0 text-gray-300">▶️</div>
	<div class="p-3 w-full truncate">{name}</div>
	<div class="p-3 w-full">{artist}</div>
	<!-- <div class="p-3 w-full">{}</div> -->
</a>
