<script lang="ts">
	export let size: 'full' | 'small' = 'full';
	export let centered: boolean = true;

	const sizeClass = size === 'full' ? 'w-full lg:w-[80%]' : 'w-[80%] md:w-[50%] lg:max-w-[30%]';
	const centeredClass = centered ? 'mx-auto' : '';
	const buttonAlign = size === 'full' ? 'flex-end' : 'auto';
</script>

<form
	{...$$props}
	class={`flex flex-col gap-2 sm:gap-3 text-center lg:text-start mb-32 md:mb-64 lg:mb-0 ${sizeClass} ${centeredClass}`}
	style={`--align: ${buttonAlign}`}
	on:submit|preventDefault
>
	<slot />
</form>

<style lang="postcss">
	:global(button:last-of-type) {
		align-self: var(--align, 'auto');
	}

	:global(.row) {
		@apply flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end;
	}
</style>
