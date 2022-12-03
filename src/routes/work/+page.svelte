<script lang="ts">
	import SubPageLayout from '$lib/components/SubPageLayout.svelte';
	import Work from '$lib/components/Work.svelte';
</script>

<SubPageLayout title="What I'm working on:">
	<div class="flex flex-col gap-6 font-mono pt-3">
		<Work
			href="https://i.pinimg.com/originals/49/aa/b3/49aab3b1b113e8d3315af1dd1eeef971.jpg"
			title="Finals!!!"
			timeStarted="Dec 2022"
		/>
		<Work
			href="https://github.com/tensorchord/envd"
			title="envd"
			description="a command-line tool that helps you create the container-based development environment"
			timeStarted="Nov 2022"
		/>

		<Work href="/blog/k8s-notes" title="Learning Kubernetes" timeStarted="Nov 2022" />

		<Work href="/blog/ml-notes" title="Learning ML Infra" timeStarted="Nov 2022" />

		<Work
			href="https://instacoach.com"
			title="Instacoach"
			description=" A marketplace that allows athletes to monetize their talents"
			timeStarted="Jan 2022"
		/>
	</div>
</SubPageLayout>
