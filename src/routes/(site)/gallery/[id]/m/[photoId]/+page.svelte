<script lang="ts">
	import { goto } from '$app/navigation';
	import { gallery, currentPhoto as photoStore } from '$lib/stores/galleryStore';
	export let data: PageData;
	import LikeButton from '$lib/components/LikeButton.svelte';
	import { toggleLike } from '$lib/utils';
	import viewport, { type IntersectionObserverEntry } from '$lib/useViewportAction';
	import CommentTrigger from '$lib/components/comments/CommentTrigger.svelte';
	import type { PageData } from './$types';
	import type { Image } from '$lib/types';

	let innerWidth = 0;
	let loading: 'pending' | 'loading' | 'loaded' = 'pending';

	$: if (data) {
		loading = 'loading';
	}

	let currentPhoto: Image | undefined = undefined;

	let photoIndex: number | undefined = undefined;
	let galleryWrapper: HTMLElement | null = null;
	let imagePositions: {
		id: string;
		position: number;
	}[] = [];

	$: width = innerWidth;

	$: if (currentPhoto) photoStore.set(currentPhoto);

	$: if (width > 786) {
		goto(`/gallery/${data.id}/${data.photoId}`);
	}
	$: if ($gallery.length) {
		photoIndex = $gallery.findIndex((photo) => photo.id === data.photoId);
		imagePositions = $gallery.map((photo, index) => ({ id: photo.id, position: index * width }));
		loading = 'loaded';
		currentPhoto = $gallery[photoIndex];
	}
	$: if (galleryWrapper && photoIndex !== undefined) {
		// scroll to the current photo
		galleryWrapper?.scrollTo({
			left: photoIndex * width,
			behavior: 'instant'
		});
		window.scrollTo({ top: 77, behavior: 'instant' });
	}

	let currentPhotoId: string | undefined = data.photoId;

	function watchScroll() {
		const scrollLeft = galleryWrapper ? galleryWrapper.scrollLeft : 0;
		const currentImage = imagePositions.find(
			(image) => Math.abs(image.position - scrollLeft) <= 50
		);
		if (currentImage) {
			window.history.replaceState(null, '', `/gallery/${data.id}/${currentImage.id}`);
			currentPhotoId = currentImage.id;
			console.log(currentImage.id);
			photoStore.set($gallery.find((photo) => photo.id === currentImage.id) || null);
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

	function hideBackToGallery() {
		const backToGallery = document.getElementById('back-to-gallery');

		if (backToGallery) {
			if (window.scrollY < 77) {
				backToGallery.classList.add('hide');
			} else {
				backToGallery.classList.remove('hide');
			}
		}
	}
</script>

<svelte:window bind:innerWidth on:scroll={hideBackToGallery} />

<div class="grid grid-rows-[1fr_auto] h-[100dvh]">
	{#if loading === 'pending'}
		<div class="flex justify-center items-center h-full"></div>
	{:else if loading === 'loading'}
		<div class="flex justify-center items-center h-full">
			<span class="loading loading-spinner loading-lg text-megan-500"></span>
		</div>
	{:else if loading === 'loaded'}
		<div class="carousel relative w-full" bind:this={galleryWrapper} on:scroll={watchScroll}>
			<div class="fixed top-4 left-4 z-30" id="back-to-gallery">
				<button on:click={backToGallery} class="text-white">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 -960 960 960"
						class="w-6 h-6 fill-current"
					>
						<path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
					</svg>
				</button>
			</div>
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
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<div class="btm-nav">
	<button on:click={() => goto(`/gallery/${data.id}`)}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-6 h-6 fill-current"
			><path
				d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"
			/></svg
		>
	</button>
	{#if currentPhoto}
		<CommentTrigger photo={currentPhoto} isBottomNav />
		<LikeButton
			isBottomNav
			size="lg"
			id={currentPhoto.id}
			{toggleLike}
			likes={currentPhoto.likes}
		/>
	{/if}
	{#if currentPhoto?.url}
		<button on:click={() => goto(currentPhoto.url)}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-6 h-6 fill-current"
				><path
					d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
				/></svg
			>
		</button>
	{/if}
</div>

<style>
	.bg {
		--bg: none;
		background-image: var(--bg);
		background-size: cover;
		background-position: center;
		height: 100%;
		filter: blur(10px);
		scale: 1.2;
	}

	#back-to-gallery {
		transform: translateX(0);
		transition: all 0.3s;
	}

	#back-to-gallery.hide {
		/* slide off screen */
		transform: translateX(calc(-100% - 1rem));
	}
</style>
