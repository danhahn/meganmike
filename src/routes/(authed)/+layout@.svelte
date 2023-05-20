<script>
	import Section from '$lib/components/Section.svelte';
	import Header from '$lib/components/admin/Header.svelte';

	const user = true;

	const className = user ? 'grid-cols-[200px_1fr]' : '';
</script>

<div class={`grid grid-rows-1 min-h-full ${className}`}>
	{#if user}
		<Header />
	{/if}

	<Section>
		<slot />
	</Section>
</div>
