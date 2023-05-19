<script lang="ts">
	export let size: 'full' | 'small' = 'full';
	export let centered: boolean = true;

	$: sizeClass = size === 'full' ? 'w-full' : 'max-w-sm';
	$: centeredClass = centered ? 'mx-auto' : '';
</script>

{sizeClass}

{centeredClass}

<form {...$$props} class={`flex flex-col gap-4 ${sizeClass} ${centeredClass}`}>
	<slot />
</form>

<style lang="postcss">
	:global(button:last-of-type) {
		align-self: flex-end;
	}
</style>
