<script lang="ts">
	import { sortDirectionStore, sortFieldStore } from '$lib/stores/sortStore';
	import { toggleOptions } from '$lib/utils';
	export let sortDialog: HTMLDialogElement;

	if (sortDialog) {
		sortDialog.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				sortDialog.close();
			}
		});
	}
</script>

<div
	class="relative bg-white text-left p-4 rounded-md shadow-lg z-[1001] lg:flex lg:gap-4 items-center"
>
	<p class="text-md text-gray-600">Sort By</p>
	<div class="bg-gray-100 grid grid-cols-2 gap-2 p-1">
		{#each toggleOptions as { field, label } (field)}
			<button
				on:click={() => {
					if ($sortFieldStore !== field) {
						sortFieldStore.set(field);
						sortDialog.close();
					}
				}}
				class="bg-gray-300 rounded-md py-2 px-4 text-black"
				class:selected={$sortFieldStore === field}>{label}</button
			>
		{/each}
	</div>
	<p class="text-md mt-4 lg:mt-0 text-gray-600">Direction</p>
	<div class="bg-gray-100 grid grid-cols-2 gap-2 p-1">
		<button
			on:click={() => {
				if ($sortDirectionStore !== 'desc') {
					sortDirectionStore.set('desc');
					sortDialog.close();
				}
			}}
			class="bg-gray-300 rounded-md py-2 px-4 text-black"
			class:selected={$sortDirectionStore === 'desc'}
		>
			{#if $sortFieldStore === 'likes'}
				Most
			{:else}
				Newest
			{/if}
		</button>
		<button
			on:click={() => {
				if ($sortDirectionStore !== 'asc') {
					sortDirectionStore.set('asc');
					sortDialog.close();
				}
			}}
			class="bg-gray-300 rounded-md py-2 px-4 text-black"
			class:selected={$sortDirectionStore === 'asc'}
		>
			{#if $sortFieldStore === 'likes'}
				Least
			{:else}
				Oldest
			{/if}
		</button>
	</div>
	<button
		on:click={() => sortDialog.close()}
		class="absolute top-2 right-2 lg:static lg:top-auto lg:right-auto"
		><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
			><path
				d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
			/></svg
		></button
	>
</div>

<style lang="postcss">
	.selected {
		@apply bg-gray-500 text-white;
	}
</style>
