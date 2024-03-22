<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/forms/Button.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	$: innerWidth = 1000;

	$: imageSize = innerWidth > 768 ? 1000 : innerWidth;
</script>

<svelte:head>
	<title>Gallery | {data.id} | {data.currentPhoto?.name || ''}</title>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>
<svelte:window bind:innerWidth />

{#if data.status === 404}
	<p>Page Not found</p>
{:else}
	<button class="fixed z-50 top-6 left-2" on:click={() => goto(`/gallery/${data.id}`)}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 -960 960 960"
			class="w-6 h-6 fill-white translate-x-1"
		>
			<path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
		</svg>
	</button>
	<div class="h-full grid place-content-center fixed bg-megan-400 inset-0">
		<div class="grid image-stack">
			<img
				src={`${data.currentPhoto?.url}&tr=w-${imageSize},h-${imageSize},c-at_least`}
				alt=""
				class="max-h-screen shadow-lg shadow-black/40"
			/>
			{#if data.nextPhoto}
				<div class="self-center flex justify-end px-6 z-50">
					<button
						on:click={() => {
							goto(`/gallery/${data.id}/${data.nextPhoto?.id}`);
						}}
						class="bg-megan-600/60 aspect-square w-12 grid place-content-center text-white rounded-full"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 -960 960 960"
							class="w-6 h-6 fill-current translate-x-[1px]"
						>
							<path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
						</svg>
					</button>
				</div>
			{/if}
			{#if data.currentPhoto !== undefined}
				<Button class="fixed inset-4 top-auto" on:click={() => goto(data.currentPhoto?.url || '')}
					>View Larger</Button
				>
			{/if}
		</div>
	</div>
{/if}

<style lang="postcss">
	.image-stack > * {
		grid-column: 1 / -1;
		grid-row: 1 / -1;
	}
</style>
