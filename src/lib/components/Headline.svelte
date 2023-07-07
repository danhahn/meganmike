<script lang="ts">
	import Section from './Section.svelte';
	import Stack from './Stack.svelte';
	export let size: 'small' | 'default' = 'default';

	$: isSmall = size === 'small';
</script>

<Section isColumn={false} padding={size === 'default'} class="mb-4">
	<Stack>
		<img
			src="/butterfly.svg"
			alt="butterfly"
			class="opacity-20 z-10 w-16 mx-auto rotate-12 -translate-y-3"
		/>

		<h1
			class={`font-display text-center text-3xl lg:text-5xl text-megan-800 border-b border-b-megan-900 pb-4 z-20 ${$$props.class}`}
			class:isSmall
		>
			<slot />
		</h1>
	</Stack>
</Section>

<style lang="postcss">
	.isSmall {
		@apply scale-50 border-none;
	}
</style>
