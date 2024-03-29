<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/forms/Button.svelte';
	import type { PageData } from './$types';
	import { gallery } from '$lib/stores/galleryStore';
	import type { Image } from '$lib/types';
	import LikeButton from '$lib/components/LikeButton.svelte';
	import { toggleLike } from '$lib/utils';
	import DownloadHelp from '$lib/components/DownloadHelp.svelte';

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

	let dialog: HTMLDialogElement;
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
			<div class="grid">
				<img
					src={`${currentPhoto.url}&tr=w-${imageSize},h-${imageSize},c-at_least`}
					alt=""
					class="max-h-screen shadow-lg shadow-black/40 col-start-1 row-start-1"
				/>
				<LikeButton id={currentPhoto.id} {toggleLike} likes={currentPhoto.likes} />
			</div>
		{/if}

		{#if currentPhoto !== undefined}
			<div class="fixed inset-4 top-auto right-auto flex gap-4">
				<button on:click={() => dialog.showModal()}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 -960 960 960"
						class="w-8 h-8 fill-megan-50"
					>
						><path
							d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
						/></svg
					>
				</button>
				<a
					href={currentPhoto.url}
					target="_blank"
					class=" flex gap-2 items-center bg-megan-600/60 text-white px-6 py-2 rounded-full z-50"
					>Download <svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 -960 960 960"
						class="w-6 h-6 fill-current"
						><path
							d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
						/></svg
					></a
				>
			</div>
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

<dialog bind:this={dialog} class="bg-transparent">
	<DownloadHelp close={() => dialog.close()} showCloseButton />
</dialog>
