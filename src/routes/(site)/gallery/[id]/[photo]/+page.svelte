<script lang="ts">
	import { collectionStore } from 'sveltefire';
	import type { PageData } from './$types';
	import { db, firestore, storage } from '$lib/firebase/firebase';
	import { collection, orderBy, query, where } from 'firebase/firestore';

	import type { Image } from '$lib/types';
	import { onMount } from 'svelte';
	import { gotoAndScroll } from '$lib/utils';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let status: 'loading' | PageData['status'] = 'loading';

	let photo: HTMLDivElement;

	$: status = data.status;
	$: photoId = data.photo;

	let count = data.imageCount;

	const imagesRef = collection(db, 'photos');
	const q = query(imagesRef, where('gallery', '==', data.id), orderBy('dateAdded', 'desc'));
	const images = collectionStore<Image>(firestore, q as any);

	$: currentImage = $images.find((image) => image.name === photoId);
	$: currentImageIndex = $images.findIndex((image) => image.name === photoId);
	$: nextImageIndex = currentImageIndex + 1;
	$: prevImageIndex = currentImageIndex - 1;

	$: nextUrl = $images.find((_, index) => index === nextImageIndex)?.name;
	$: prevUrl = $images.find((_, index) => index === prevImageIndex)?.name;

	let imageElement: HTMLImageElement;

	async function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'j') {
			if (nextUrl) {
				gotoAndScroll(nextUrl, photo);
			} else {
				goto(`/gallery/${data.id}`);
			}
		}
		if (event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'k') {
			if (prevUrl) {
				gotoAndScroll(prevUrl, photo);
			}
		}
		if (event.key === 'h') {
			if (prevUrl) {
				goto(`gallery/${data.id}`);
			}
		}
	}
</script>

<svelte:head>
	<title>Gallery | {data.id}</title>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>

<svelte:body on:keydown|preventDefault={handleKeyPress} />

{#if status === 'loading'}
	<p>Loading...</p>
{:else if status === 'idle'}
	<h3 class="p-4 uppercase bg-megan-300/35 text-center text-megan-700">{data.id}</h3>

	{#if count === 0 && status === 'idle'}
		<p>Be the first to add a memory</p>
	{:else}
		<div class="page-layout" bind:this={photo}>
			<div class="grid image-stack col-start-1 row-start-1">
				{#if currentImage}
					<div class="min-h-screen w-full overflow-hidden">
						<div
							class="image-view min-h-screen w-full"
							style={`--image: url('${currentImage.url}')`}
						/>
					</div>

					<div class="z-10 grid place-content-center -translate-y-16">
						<a href={currentImage.url}>
							<img
								class="max-h-screen shadow-lg shadow-black/40"
								src={`${currentImage.url}`}
								alt=""
							/>
						</a>
					</div>

					<div class="col-start-1 row-start-1 self-center flex justify-between px-6 z-50">
						{#if prevUrl !== undefined}
							<div
								class="bg-megan-600 aspect-square w-12 grid place-content-center text-white rounded-full"
							>
								<button
									on:click={() => {
										gotoAndScroll(prevUrl, photo);
									}}
									class="bg-megan-600 aspect-square w-12 grid place-content-center text-white rounded-full"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 -960 960 960"
										class="w-6 h-6 fill-current translate-x-1"
									>
										<path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
									</svg>
								</button>
							</div>
						{:else}
							<div />
						{/if}
						{#if nextUrl}
							<div
								class="bg-megan-600 aspect-square w-12 grid place-content-center text-white rounded-full"
							>
								<button
									on:click={() => {
										gotoAndScroll(nextUrl, photo);
									}}
									class="bg-megan-600 aspect-square w-12 grid place-content-center text-white rounded-full"
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
						{:else}
							<div />
						{/if}
					</div>
				{/if}
			</div>

			<div class="scroll">
				<ul class="gallery-view">
					{#each $images as item (item.id)}
						<li class="w-mobile-icon lg:w-icon" id={item.name}>
							<button
								on:click={() => {
									gotoAndScroll(`/gallery/${data.id}/${item.name}`, photo);
								}}
							>
								<img
									src={`${item.url}&tr=w-300,h-300`}
									alt=""
									class="aspect-square overflow-hidden object-cover w-mobile-icon lg:w-icon lg:h-icon"
								/>
							</button>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
{:else if status === 'error'}
	<p>Invalid gallery ID</p>
{/if}

<style lang="postcss">
	div.scroll {
		width: 100vw;
		overflow-x: auto;
		overflow-y: hidden;
		white-space: nowrap;
		@apply -translate-y-28;
		z-index: 100;
	}

	.gallery-view {
		display: grid;
		grid-template-columns: 112px;
		grid-template-rows: 112px;
		grid-auto-flow: column;

		@media (min-width: 768px) {
			grid-template-columns: 180px;
			grid-template-rows: 180px;
		}
	}

	.page-layout {
		display: grid;
		grid-template-rows: 1fr auto;
	}

	.image-stack > * {
		grid-column: 1 / -1;
		grid-row: 1 / -1;
	}

	.image-view {
		filter: blur(10px);
		transform: scale(1.1);
		background-image: var(--image);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
