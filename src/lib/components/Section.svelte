<script lang="ts">
	export let isColumn: boolean = true;
</script>

<section {...$$props} class:isColumn><slot /></section>

<style lang="postcss">
	:global(h2) {
		@apply text-2xl text-megan-600 uppercase;
	}

	section {
		@apply container mx-auto p-4 lg:p-8 max-w-5xl;
	}

	section.isColumn {
		@apply grid gap-4;
	}
</style>
