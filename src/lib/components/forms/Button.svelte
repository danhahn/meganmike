<script lang="ts">
	export let variant: 'primary' | 'naked' = 'primary';
	export let width: 'full' | 'default' = 'default';
	$: isPrimary = variant === 'primary';
	$: isNaked = variant === 'naked';
	$: isFull = width === 'full';
</script>

<button
	{...$$props}
	on:click
	class:isFull
	class:isPrimary
	class:isNaked
	class="uppercase px-10 py-2 rounded-md"><slot /></button
>

<style lang="postcss">
	.isPrimary {
		@apply bg-megan-600 text-white;
	}

	.isFull {
		@apply w-full;
	}

	.isNaked {
		@apply text-megan-900;
	}
</style>
