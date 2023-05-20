<script>
	import Section from '$lib/components/Section.svelte';
	import Header from '$lib/components/admin/Header.svelte';
	import { user } from '$lib/stores/user';

	const className = $user ? 'grid grid-cols-[200px_1fr]' : '';
</script>

<div class={` min-h-full ${className}`}>
	{#if $user}
		<Header />
	{/if}

	<Section>
		<slot />
	</Section>
</div>
