<script lang="ts">
	export let data: any;
	type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
	const component = data.component as unknown as C;
	console.log(component);
</script>

<svelte:component this={component} />
