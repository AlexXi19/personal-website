<script lang="ts">
	export let name: string;
	export let href: string;
	export let img: string;
</script>

<!-- Rectangle card with rectangle image and name -->
<a {href} target="_blank">
	<div
		class="flex flex-col gap-2 w-[310px] h-[320px] bg-[#302c2c] items-center justify-center rounded-2xl"
	>
		<!-- Square image with object cover -->
		<img class="rounded-2xl aspect-square object-cover h-[230px] p-2" src={img} alt={name} />
		<p class="font-inherit truncate text-2xl">{name}</p>
	</div>
</a>
