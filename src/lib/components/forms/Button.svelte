<script lang="ts">
	export let variant: 'primary' | 'naked' | 'secondary' = 'primary';
	export let width: 'full' | 'default' = 'default';
	export let size: 'small' | 'default' = 'default';
	export let isRound: boolean = false;
	$: isPrimary = variant === 'primary';
	$: isSecondary = variant === 'secondary';
	$: isNaked = variant === 'naked';
	$: isFull = width === 'full';
	$: isSmall = size === 'small';
</script>

<button
	{...$$props}
	on:click
	class="uppercase px-10 py-2 rounded-md transition-all ease-in-out hover:shadow hover:shadow-black/50 focus:outline-megan-900 "
	class:isFull
	class:isPrimary
	class:isSecondary
	class:isSmall
	class:isRound
	class:isNaked><slot /></button
>

<style lang="postcss">
	.isPrimary {
		@apply bg-megan-600 hover:bg-megan-500 text-white;
	}

	.isPrimary {
		@apply bg-megan-600 hover:bg-megan-500 text-white;
	}

	.isSecondary {
		@apply bg-megan-200 hover:bg-megan-300 text-black;
	}

	.isFull {
		@apply w-full;
	}

	.isSmall {
		@apply px-3 py-1 text-sm;
	}

	.isRound {
		@apply rounded-full aspect-square p-0 grid place-content-center h-10;
	}

	.isRound.isSmall {
		@apply h-7;
	}

	.isNaked {
		@apply text-megan-900 hover:shadow-none hover:text-black;
	}
</style>
