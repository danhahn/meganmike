<script lang="ts">
	import { goto } from '$app/navigation';
	import { gallery } from '$lib/stores/galleryStore';
	export let data: PageData;
	import LikeButton from '$lib/components/LikeButton.svelte';
	import { addComment, toggleLike } from '$lib/utils';
	import viewport, { type IntersectionObserverEntry } from '$lib/useViewportAction';
	import type { PageData } from './$types';

	let innerWidth = 0;
	let loading: 'pending' | 'loading' | 'loaded' = 'pending';

	$: if (data) {
		loading = 'loading';
	}

	let photoIndex: number | undefined = undefined;
	let galleryWrapper: HTMLElement | null = null;
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

	let comment = '🍑';

	async function handleSubmit() {
		if (!currentPhotoId) return;
		await addComment(currentPhotoId, comment);
		console.log('update');
		comment = '';
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
						<div class="z-20 col-start-1 row-start-1 flex justify-end items-center p-6">
							<LikeButton size="large" id={photo.id} {toggleLike} likes={photo.likes} />
						</div>
						{#if photo.comments}
							<div class="z-20 col-start-1 row-start-1 flex justify-start items-end p-6">
								<div class="indicator">
									<span class="indicator-item badge badge-primary font-mono"
										>{photo.comments.length}</span
									>
									<button class="btn" popovertarget={`photo-${photo.id}`}
										><svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 -960 960 960"
											class="w-6 h-6 fill-current"
											><path
												d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z"
											/></svg
										></button
									>
								</div>
							</div>
							<div id={`photo-${photo.id}`} popover>
								<div class="flex justify-between p-2 bg-megan-400">
									<h3>Comments</h3>
									<button popovertarget={`photo-${photo.id}`} popovertargetaction="hide"
										>close</button
									>
								</div>
								<div class="comments">
									{#each photo.comments.reverse() as { comment, timestamp }}
										<div class="border-b border-base-300 p-1">
											<p class="font-bold">{comment}</p>
											<p class="text-sm opacity-50 text-right">
												{new Date(timestamp.seconds * 1000).toLocaleString('en-US', {
													month: '2-digit',
													day: '2-digit',
													year: 'numeric',
													hour: '2-digit',
													minute: '2-digit'
												})}
											</p>
										</div>
									{/each}
								</div>
								<div class="bg-megan-300 p-2 add-comment">
									<form
										on:submit|preventDefault={handleSubmit}
										class="flex justify-stretch items-center"
									>
										<input
											type="text"
											class="input w-full focus:outline-none rounded-r-none"
											placeholder="Add Comment"
											bind:value={comment}
										/>
										<button
											class="btn btn-primary bg-megan-500 border-megan-700 text-white rounded-l-none"
											type="submit"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 -960 960 960"
												class="w-6 h-6 fill-current"
												><path
													d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"
												/></svg
											>
										</button>
									</form>
								</div>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
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

	#back-to-gallery {
		transform: translateX(0);
		transition: all 0.3s;
	}

	#back-to-gallery.hide {
		/* slide off screen */
		transform: translateX(calc(-100% - 1rem));
	}

	[popover] {
		width: 100vw;
		min-height: calc(100vh - 64px);
		height: clamp(10rem, 50vh, 80vh);

		position: relative;
		margin: 0;
		margin-top: 77px;
		padding: 0;
	}

	[popover] .add-comment {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
	}

	[popover] .comments {
		padding: 0.5rem;
	}
	[popover]::backdrop {
		background-color: rgb(0 0 0 / 50%);
	}
</style>
