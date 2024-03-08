<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Section from '$lib/components/Section.svelte';
	import type { PageData } from './$types';
	import { DownloadURL, UploadTask, collectionStore } from 'sveltefire';
	import { collection, where, query, doc, arrayUnion, updateDoc } from 'firebase/firestore';
	import { firestore, storage } from '$lib/firebase/firebase';
	import Button from '$lib/components/forms/Button.svelte';
	import { onMount } from 'svelte';
	import Input from '$lib/components/forms/Input.svelte';
	export let data: PageData;

	const postsRef = collection(firestore, 'galleries');
	type Gallery = {
		id: string;
		name: string;
		photos: {
			name: string;
			date: string;
			uploadedBy: string;
		}[];
	};
	const q = query(postsRef, where('name', '==', data.id));

	const gallery = collectionStore(firestore, q);

	$: isValidGallery = $gallery && $gallery.length === 1;

	$: id = $gallery[0]?.id;

	$: g = $gallery[0] as Gallery;

	$: images = g?.photos.map((photo) => `${data.id}/${photo.name}`);

	let image = '';

	let file: File | undefined;

	let guestName: string = '';
	let uploadedBy: string | undefined;

	let uploader: HTMLInputElement;

	type Photo = {
		name: string;
		date: string;
		uploadedBy: string;
	};

	async function chooseFile(e: Event) {
		file = (e.target as HTMLInputElement).files?.[0];
		if (!file) return;
		if (!uploadedBy) return;

		const photoData: Photo = {
			name: file.name,
			date: new Date().toISOString(),
			uploadedBy
		};

		setTimeout(async () => {
			await updateDoc(doc(firestore, 'galleries', id), { photos: arrayUnion(photoData) });
			console.log('uploaded');
			resetUpload();
		}, 3000);
	}

	function resetUpload() {
		file = undefined;
		if (uploader) uploader.value = '';
	}

	function setUploadedBy() {
		uploadedBy = guestName;
		window.localStorage.setItem('uploadedBy', uploadedBy);
	}

	onMount(() => {
		const localData = window.localStorage.getItem('uploadedBy');
		if (localData) {
			uploadedBy = localData;
		}
	});

	let currentIndex: number | undefined = undefined;

	function next() {
		if (currentIndex === undefined) {
			currentIndex = 0;
		}
		// check if we are at the end of the array
		if (currentIndex === images.length - 1) {
			currentIndex = 0;
		} else {
			currentIndex = currentIndex + 1;
		}
	}

	function previous() {
		if (currentIndex === undefined) {
			currentIndex = 0;
		}
		// check if we are at the start of the array
		if (currentIndex === 0) {
			currentIndex = images.length - 1;
		} else {
			currentIndex = currentIndex - 1;
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

{#if !isValidGallery}
	<Headline>Gallery not found</Headline>
	<Section>
		<p>Sorry, we couldn't find the gallery you were looking for.</p>
	</Section>
{:else if uploadedBy === undefined}
	<Headline>Who are you?</Headline>
	<Section>
		<p>Megan and Mike would love for you to share your photos form todays event.</p>
		<p>Please enter your name below to get started.</p>
		<form on:submit|preventDefault={setUploadedBy} class="flex flex-col lg:flex-row gap-4">
			<Input label="Full Name" id="name" type="text" bind:value={guestName} />
			<Button type="submit">Submit</Button>
		</form>
	</Section>
{:else}
	<Headline>Add a photo to todays event</Headline>

	<Section>
		<p>Hey <span class="font-bold">{uploadedBy}</span> please add any photos you want to share</p>

		{#if file}
			<h2>Uploading {file.name}</h2>
			<UploadTask ref={`${data.id}/${file.name}`} data={file} let:progress let:snapshot>
				{#if snapshot?.state === 'running'}
					<div class="flex gap-4">
						<progress class="flex-1 progress" value={progress} max="100">{progress}%</progress>
						<p class="text-sm">{progress.toFixed(2)}% uploaded</p>
					</div>
				{/if}

				{#if snapshot?.state === 'success'}
					<DownloadURL ref={snapshot?.ref} let:link>
						<a href={link} download>
							<img src={link} alt="" />
						</a>
					</DownloadURL>
					<Button on:click={resetUpload}>Upload an other photo</Button>
				{/if}
			</UploadTask>
		{:else}
			<p class="border border-megan-600 text-xs bg-white p-2 rounded-lg text-gray-500 text-center">
				Please upload a any photos you have from todays event to share with Megan and Mike.
			</p>

			<div class="upload-btn-wrapper">
				<button class="btn">Upload a file</button>
				<input
					type="file"
					id="file_input"
					bind:this={uploader}
					accept="image/*"
					on:change={chooseFile}
				/>
			</div>
		{/if}

		{#each images as photo, index}
			{#if index === currentIndex}
				<DownloadURL ref={`${photo}`} let:link let:ref>
					<!-- show img -->
					<div class="border-2 border-megan-200 p-2 bg-white grid place-items-center shadow-lg">
						<img src={link} alt={link} />
					</div>
				</DownloadURL>
				<div class="grid gap-4 grid-cols-2">
					<Button on:click={previous}>PREVIOUS</Button>
					<Button class="btn" on:click={next}>NEXT</Button>
				</div>
			{/if}
		{/each}

		<ul class="grid grid-cols-2 lg:grid-cols-4 gap-2">
			<!-- Listing the objects in the given folder -->
			{#each g.photos as item, index}
				<li class="flex flex-col gap-2">
					<DownloadURL ref={`${data.id}/${item.name}`} let:link let:ref>
						<!-- show img -->
						{#if link}
							<div class="border grid gap-2 border-megan-300 rounded-lg p-2 bg-megan-100">
								<button class="grid" on:click={() => (currentIndex = index)}>
									<img
										src={link}
										alt={item.name}
										class="col-start-1 row-start-1 aspect-square object-cover"
									/>
									<p
										class="text-sm col-start-1 bg-megan-50/80 self-start justify-self-center rounded-full px-4 mt-2 row-start-1"
									>
										{new Date(item.date).toLocaleTimeString()}
									</p>
									<p
										class="text-sm col-start-1 bg-megan-50/80 font-bold self-end justify-self-center rounded-full px-4 mb-2 row-start-1"
									>
										{item.uploadedBy}
									</p>
								</button>

								<!-- or download via link -->
								<Button size="small" href={link} download>Download</Button>
							</div>
						{/if}
					</DownloadURL>
				</li>
			{/each}
		</ul>

		<div class="flex justify-end">
			<Button
				variant="secondary"
				on:click={() => {
					window.localStorage.removeItem('uploadedBy');
					uploadedBy = undefined;
				}}
				>Log out
				<span class="material-symbols-outlined"> logout </span>
			</Button>
		</div>
	</Section>
{/if}

<style lang="postcss">
	.progress {
		@apply w-full rounded-full h-4 overflow-hidden;
	}
	.progress::-webkit-progress-bar {
		@apply bg-gray-700;
	}
	.progress::-webkit-progress-value {
		@apply bg-megan-400;
	}

	.upload-btn-wrapper {
		position: relative;
		overflow: hidden;
		display: inline-block;
	}

	.btn {
		border: 2px solid;
		color: gray;
		background-color: white;
		padding: 8px 20px;
		border-radius: 8px;
		font-size: 20px;
		font-weight: bold;
		@apply w-full border-megan-400 text-megan-600;
	}

	.upload-btn-wrapper input[type='file'] {
		font-size: 100px;
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
	}
</style>
