<script lang="ts">
	export let size: 'full' | 'small' = 'full';
	export let centered: boolean = true;

	const sizeClass = size === 'full' ? 'w-full' : 'max-w-sm';
	const centeredClass = centered ? 'mx-auto' : '';
	const buttonAlign = size === 'full' ? 'flex-end' : 'auto';
</script>

<form
	{...$$props}
	class={`flex flex-col gap-4 ${sizeClass} ${centeredClass}`}
	style={`--align: ${buttonAlign}`}
	on:submit|preventDefault
>
	<slot />
</form>

<style lang="postcss">
	:global(button:last-of-type) {
		align-self: var(--align, 'auto');
	}
</style>
