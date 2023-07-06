<script lang="ts">
	export let isColumn: boolean = true;
	export let padding: boolean = true;
</script>

<section {...$$props} class:isColumn class:padding><slot /></section>

<style lang="postcss">
	:global(h2) {
		@apply text-2xl lg:text-4xl mt-9 text-megan-600 uppercase;
	}

	:global(p) {
		@apply lg:text-xl lg:leading-8;
	}

	section {
		@apply container mx-auto lg:max-w-[70ch];
	}

	section.isColumn {
		@apply grid gap-4 mt-8 mb-20;
	}

	section.padding {
		@apply p-10 lg:p-8;
	}
</style>
