<section><slot /></section>

<style lang="postcss">
	:global(h2) {
		@apply text-2xl text-megan-600 uppercase;
	}

	section {
		@apply grid gap-4 container mx-auto p-8 max-w-2xl;
	}
</style>
