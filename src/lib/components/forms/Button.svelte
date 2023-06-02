<script lang="ts">
	export let variant: 'primary' | 'naked' | 'secondary' = 'primary';
	export let width: 'full' | 'default' = 'default';
	export let size: 'small' | 'default' = 'default';
	export let isRound: boolean = false;
	export let disabled: boolean = false;
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
	{disabled}
	class:isFull
	class:isPrimary
	class:isSecondary
	class:isSmall
	class:isRound
	class:isNaked><slot /></button
>

<style lang="postcss">
	.isPrimary:not(:disabled) {
		@apply hover:bg-megan-500;
	}

	.isPrimary {
		@apply bg-megan-600 text-white;
	}
	.isPrimary:disabled {
		@apply bg-megan-400 text-white;
	}

	.isSecondary:not(:disabled) {
		@apply hover:bg-megan-300;
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
	button:disabled {
		@apply hover:shadow-none cursor-not-allowed;
	}
</style>
