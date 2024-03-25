<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/forms/Button.svelte';
	import type { PageData } from './$types';
	import { gallery } from '$lib/stores/galleryStore';
	import type { Image } from '$lib/types';

	export let data: PageData;

	// get the current photo index from the gallery
	$: currentIndex = $gallery.findIndex((photo) => photo.id === data.photoId);

	$: currentPhoto = $gallery[currentIndex];

	let prevPhoto: Image | undefined;

	$: nextPhoto = $gallery[currentIndex + 1];
	$: if (currentIndex === 0) {
		prevPhoto = undefined;
	} else {
		prevPhoto = $gallery[currentIndex - 1];
	}

	$: innerWidth = 1000;

	$: imageSize = innerWidth > 768 ? 1000 : innerWidth;
</script>

<svelte:head>
	<title>Gallery | {data.id} | {currentPhoto?.name || ''}</title>
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
		{#if currentPhoto !== undefined}
			<img
				src={`${currentPhoto.url}&tr=w-${imageSize},h-${imageSize},c-at_least`}
				alt=""
				class="max-h-screen shadow-lg shadow-black/40"
			/>
		{/if}

		{#if currentPhoto !== undefined}
			<Button class="fixed inset-4 top-auto" on:click={() => goto(currentPhoto?.url || '')}
				>View Larger</Button
			>
		{/if}

		<div class="flex justify-between self-center fixed top-1/2 left-0 right-0">
			<div class=" flex justify-start px-6 z-50">
				{#if prevPhoto !== undefined}
					<button
						on:click={() => {
							goto(`/gallery/${data.id}/${prevPhoto?.id}`);
						}}
						class="bg-megan-600/60 aspect-square w-8 h-8 lg:h-12 lg:w-12 grid place-content-center text-white rounded-full"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 -960 960 960"
							class="w-4 h-4 lg:w-6 lg:h-6 fill-current -translate-x-[2px] rotate-180"
						>
							<path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
						</svg>
					</button>
				{/if}
			</div>
			<div class="self-center flex justify-end px-6 z-50">
				{#if nextPhoto}
					<button
						on:click={() => {
							goto(`/gallery/${data.id}/${nextPhoto.id}`);
						}}
						class="bg-megan-600/60 aspect-square w-8 h-8 lg:h-12 lg:w-12 grid place-content-center text-white rounded-full"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 -960 960 960"
							class="w-4 h-4 lg:w-6 lg:h-6 fill-current translate-x-[1px]"
						>
							<path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
						</svg>
					</button>
				{/if}
			</div>
		</div>
	</div>
{/if}
