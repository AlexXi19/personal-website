<script lang="ts">
	export let data: any;
	const post = data.content;
</script>

<svelte:component this={data.content} />
