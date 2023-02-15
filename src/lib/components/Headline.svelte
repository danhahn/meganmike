<script>
	import Section from './Section.svelte';
</script>

<Section>
	<h1
		class={`font-display text-center text-3xl lg:text-5xl text-megan-800 border-b border-b-megan-900 pb-4 ${$$props.class}`}
	>
		<slot />
	</h1>
</Section>
