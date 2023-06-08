<script lang="ts">
	export let variant: 'primary' | 'naked' | 'secondary' | 'warning' | 'success' | 'light' =
		'primary';
	export let width: 'full' | 'default' = 'default';
	export let size: 'small' | 'default' | 'tiny' = 'default';
	export let isRound: boolean = false;
	export let disabled: boolean = false;
	$: isPrimary = variant === 'primary';
	$: isSecondary = variant === 'secondary';
	$: isWarning = variant === 'warning';
	$: isSuccess = variant === 'success';
	$: isLight = variant === 'light';
	$: isNaked = variant === 'naked';
	$: isFull = width === 'full';
	$: isSmall = size === 'small';
	$: isTiny = size === 'tiny';
</script>

<button
	{...$$props}
	on:click
	{disabled}
	class:isFull
	class:isPrimary
	class:isSecondary
	class:isWarning
	class:isLight
	class:isSuccess
	class:isSmall
	class:isRound
	class:isNaked
	class:isTiny
	class={`${$$props.class}`}><slot /></button
>

<style lang="postcss">
	button {
		@apply flex justify-center gap-2 uppercase px-10 py-2 rounded-md transition-all ease-in-out hover:shadow hover:shadow-black/50 focus:outline-megan-900;
	}
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

	.isWarning {
		@apply bg-red-600 hover:bg-red-400 text-white p-1;
	}

	.isSuccess {
		@apply bg-green-600 hover:bg-green-800 text-white p-1;
	}

	.isLight {
		@apply bg-megan-50 hover:bg-white border border-megan-400 text-black font-light font-sans;
	}

	.isFull {
		@apply w-full;
	}

	.isSmall {
		@apply px-3 py-1 text-sm;
	}

	.isTiny {
		@apply p-[2px] aspect-square leading-none text-sm rounded hover:shadow-sm;
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
