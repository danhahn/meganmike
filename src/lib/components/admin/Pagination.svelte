<script lang="ts">
	import { pageIndex } from '$lib/stores/navigation';
	import Button from '../forms/Button.svelte';

	export let total: number;
	export let current: number;
	export let docsPerPage: number;

	$: numberOfPages = total / docsPerPage + 1;
	$: pages = Array.from({ length: numberOfPages });
</script>

{#if total > docsPerPage}
	<div class="grid place-content-center gap-4">
		<div class="pagination">
			<Button
				size="small"
				variant="naked"
				disabled={$pageIndex === 0}
				on:click={() => pageIndex.set($pageIndex - 1)}
				><svg xmlns="http://www.w3.org/2000/svg" class="w-4 fill-current" viewBox="0 -960 960 960"
					><path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z" /></svg
				></Button
			>
			{#each pages as _, index}
				<Button
					size="small"
					on:click={() => pageIndex.set(index)}
					variant={current === index ? 'primary' : 'naked'}>{index + 1}</Button
				>
			{/each}
			<Button
				size="small"
				variant="naked"
				disabled={$pageIndex === pages.length - 1}
				on:click={() => pageIndex.set($pageIndex + 1)}
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-4 fill-current" viewBox="0 -960 960 960"
					><path d="m375-240-43-43 198-198-198-198 43-43 241 241-241 241Z" /></svg
				>
			</Button>
		</div>
	</div>
{/if}

<style lang="postcss">
	.pagination {
		@apply overflow-hidden rounded-lg inline-flex justify-center mt-4 border border-megan-800;
	}
	.pagination :global(button:not(.isPrimary)) {
		@apply bg-megan-400/50 hover:bg-megan-700 hover:text-white;
	}
	.pagination :global(button:not(.isPrimary):not(:disabled)) {
		@apply hover:bg-megan-700 hover:text-white;
	}
	.pagination :global(button) {
		@apply rounded-none;
	}
</style>
