<script lang="ts">
	type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
	export let data: { component: C };
	const component = data.component;
</script>

<svelte:component this={component} />
