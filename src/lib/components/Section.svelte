<script lang="ts">
	export let isColumn: boolean = true;
	export let padding: boolean = true;
</script>

<section {...$$props} class:isColumn class:padding><slot /></section>

<style lang="postcss">
	:global(h2) {
		@apply text-2xl text-megan-600 uppercase;
	}

	section {
		@apply container mx-auto max-w-5xl;
	}

	section.isColumn {
		@apply grid gap-4;
	}

	section.padding {
		@apply p-4 lg:p-8;
	}
</style>
