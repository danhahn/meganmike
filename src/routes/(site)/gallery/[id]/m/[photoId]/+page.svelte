<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/forms/Button.svelte';
	import { gallery } from '$lib/stores/galleryStore';
	import type { PageData } from '../$types';
	export let data: PageData;
	import LikeButton from '$lib/components/LikeButton.svelte';
	import { toggleLike } from '$lib/utils';
	import viewport, { type IntersectionObserverEntry } from '$lib/useViewportAction';
	import { onMount } from 'svelte';

	let innerWidth = 0;
	let loading: 'pending' | 'loading' | 'loaded' = 'pending';

	$: if (data) {
		loading = 'loading';
	}

	let photoIndex: number | undefined = undefined;
	let galleryWrapper: HTMLElement | null = null;
	let container: HTMLElement | null = null;
	let imagePositions: {
		id: string;
		position: number;
	}[] = [];

	$: width = innerWidth;

	$: if (width > 786) {
		goto(`/gallery/${data.id}/${data.photoId}`);
	}
	$: if ($gallery.length) {
		photoIndex = $gallery.findIndex((photo) => photo.id === data.photoId);
		imagePositions = $gallery.map((photo, index) => ({ id: photo.id, position: index * width }));
		loading = 'loaded';
	}
	$: if (galleryWrapper && photoIndex !== undefined) {
		// scroll to the current photo
		galleryWrapper?.scrollTo({
			left: photoIndex * width,
			behavior: 'instant'
		});
	}

	function watchScroll() {
		const scrollLeft = galleryWrapper ? galleryWrapper.scrollLeft : 0;
		const currentImage = imagePositions.find((image) => image.position === scrollLeft);
		if (currentImage) {
			window.history.replaceState(null, '', `/gallery/${data.id}/${currentImage.id}`);
		}
	}

	function loadImage(entry: IntersectionObserverEntry) {
		const image = entry.target as HTMLImageElement;
		const src = image.dataset.image;
		if (src) {
			image.src = src;
		}
	}

	function addBackgroundStyle(entry: IntersectionObserverEntry) {
		const bg = entry.target as HTMLElement;
		const src = bg.dataset.bg;
		if (src) {
			bg.style.setProperty('--bg', src);
		}
	}

	function backToGallery() {
		// go back to the gallery
		goto(`/gallery/${data.id}`);
	}

	function scrollToTop() {
		if (container) {
			container.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		}
	}

	onMount(scrollToTop);
</script>

<svelte:window bind:innerWidth />

<div class="grid grid-rows-[1fr_auto] h-screen" bind:this={container}>
	{#if loading === 'pending'}
		<div class="flex justify-center items-center h-full"></div>
	{:else if loading === 'loading'}
		<div class="flex justify-center items-center h-full">
			<span class="loading loading-spinner loading-lg text-megan-500"></span>
		</div>
	{:else if loading === 'loaded'}
		<div class="carousel w-full" bind:this={galleryWrapper} on:scroll={watchScroll}>
			{#each $gallery as photo}
				<div class="carousel-item w-full">
					<div class={`grid w-[${width}px]`} id={photo.id}>
						<div class="overflow-clip col-start-1 row-start-1">
							<div
								use:viewport={addBackgroundStyle}
								class="bg"
								style=""
								data-bg="url('{photo.url}')"
							></div>
						</div>
						<img
							use:viewport={loadImage}
							src=""
							class="col-start-1 row-start-1 w-full object-scale-down z-10 self-center"
							alt=""
							loading="lazy"
							data-image={photo.url}
						/>
						<div class="z-20 col-start-1 row-start-1 flex justify-end items-center p-6">
							<LikeButton size="large" id={photo.id} {toggleLike} likes={photo.likes} />
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<div class="flex justify-center p-2">
		<Button on:click={backToGallery}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-6 h-6 fill-current"
				><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg
			>
			Back to gallery
		</Button>
	</div>
</div>

<style lang="postcss">
	.bg {
		--bg: none;
		background-image: var(--bg);
		background-size: cover;
		background-position: center;
		height: 100%;
		filter: blur(10px);
		scale: 1.2;
	}
</style>
