<script lang="ts">
	import { UploadTask } from 'sveltefire';
	import type { PageData } from './$types';
	import Dialog from '$lib/components/Dialog.svelte';
	import { breakpoint, rewriteUrl, toggleLike } from '$lib/utils';
	import { db, storage } from '$lib/firebase/firebase';
	import { dev } from '$app/environment';
	import { Timestamp, addDoc, collection, doc, getDoc } from 'firebase/firestore';
	import Input from '$lib/components/forms/Input.svelte';
	import { onMount } from 'svelte';
	import type { Image, UserImageCount } from '$lib/types';
	import { getDownloadURL, ref } from 'firebase/storage';
	import GalleryIntro from '$lib/components/GalleryIntro.svelte';
	import GetStarted from '$lib/components/GetStarted.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import { gallery, userImageCount } from '$lib/stores/galleryStore';
	import viewport from '$lib/useViewportAction';
	import InfoHeader from '$lib/components/InfoHeader.svelte';
	import { userId, userLikes } from '$lib/stores/user';
	import LikeButton from '$lib/components/LikeButton.svelte';
	import Sort from '$lib/components/Sort.svelte';

	export let data: PageData;

	let dialog: HTMLDialogElement;
	let helpDialog: HTMLDialogElement;
	let sortButton: HTMLButtonElement;
	let dropdown: HTMLDivElement;
	let sortDialog: HTMLDialogElement;
	let input: HTMLInputElement;

	let status: 'loading' | PageData['status'] = 'loading';
	let files: FileList | null = null;
	let displayNameInput: string;
	let displayName: string;
	let isFilter = false;

	$: status = data.status;

	let count = data.imageCount;

	let page = 1;
	let itemsPerPage = 2;

	let images: Image[] = [];

	$: docRef = doc(db, 'likes', $userId || 'anonymous');

	// get the document
	$: if ($userId) {
		getDoc(docRef).then((doc) => {
			if (doc.exists()) {
				userLikes.set(doc.data().likes);
			}
		});
	}

	$: images = $gallery.slice(0, totalNumberRequested);

	const handleFileChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		files = input.files;
		if (files) {
			dialog.showModal();
		}
	};

	function handleDialogClose() {
		if (dialog.returnValue === 'success') {
			if (count === 0) {
				window.location.reload();
			}
			files = null;
		}
		if (dialog.returnValue === 'cancel') {
			files = null;
		}
	}

	function updateDisplayName() {
		if (!displayNameInput) return;
		// check if displayname is in local storage
		const isInLocalStage = localStorage.getItem('displayName');
		if (isInLocalStage) {
			displayName = isInLocalStage;
		} else {
			localStorage.setItem('displayName', displayNameInput);
			displayName = displayNameInput;
		}
		dialog.close();
		input.click();
	}

	async function imageAddedToGallery(file: File) {
		// add to firebase firestore collection
		const exists = images.find((image) => image.name === file.name);
		if (exists) {
			return false;
		}

		const rawUrl = await getDownloadURL(ref(storage, `${data.id}/${file.name}`));
		const url = rewriteUrl(rawUrl);

		const docRef = await addDoc(collection(db, 'photos'), {
			name: file.name,
			dateTaken: Timestamp.fromDate(new Date(file.lastModified)),
			dateAdded: Timestamp.now(),
			uploadedBy: displayName,
			size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
			likes: 0,
			gallery: data.id,
			url
		} as Image);
		if (dev) {
			console.log('Document written with ID: ', docRef.id);
		}

		return true;
	}

	function checkIfCanUpload() {
		if (displayName) {
			input.click();
		} else {
			dialog.showModal();
		}
	}

	onMount(() => {
		const isInLocalStage = localStorage.getItem('displayName');
		if (isInLocalStage) {
			displayName = isInLocalStage;
		}
	});

	let innerWidth = 0;
	let innerHeight = 0;

	// calculate the number image pre row
	$: iconsPerRow = innerWidth > breakpoint ? 5 : 3;
	$: iconSize = Math.ceil(innerWidth / iconsPerRow) - 2;

	$: numberOfRow = Math.round(innerHeight / iconSize);

	$: totalNumberRequested =
		numberOfRow * iconsPerRow * page * 1.4 -
		((numberOfRow * iconsPerRow * page * 1.4) % iconsPerRow);

	const loadMore = () => {
		page += 1;
		totalNumberRequested = page * itemsPerPage;
	};

	let isDropdownOpen = false;

	function toggleDropdown() {
		sortDialog.showModal();

		if (isDropdownOpen) {
			sortButton.setAttribute('aria-expanded', 'true');
			dropdown.focus();
		} else {
			sortButton.setAttribute('aria-expanded', 'false');
		}
	}

	let y: number;

	function filterBaseOnUserName(userName: string) {
		images = $gallery.filter((image) => image.uploadedBy === userName);
		isFilter = true;
	}

	function clearFilter() {
		images = $gallery;
		isFilter = false;
	}

	$: hideButton = y > 100;

	let tagsCount: { displayName: string; count: number }[] = [];

	$: {
		const tags = $gallery.map((image) => image.uploadedBy);
		const tagsSet = new Set(tags);
		tagsCount = Array.from(tagsSet)
			.map((tag) => {
				return {
					displayName: tag,
					count: tags.filter((t) => t === tag).length
				};
			})
			// sort by count, if the count is the same sort by name
			.sort((a, b) => {
				if (a.count > b.count) {
					return -1;
				}
				if (a.count < b.count) {
					return 1;
				}
				return a.displayName.localeCompare(b.displayName);
			});
	}
</script>

<svelte:head>
	<title>Gallery | {data.title || 'Not Found'}</title>
</svelte:head>

<svelte:window bind:innerWidth bind:innerHeight bind:scrollY={y} />

<div class=" 🔥">
	{#if data.status === 'error'}
		<div class="mt-[20vh]">
			<InfoHeader />
			<div
				class="grid justify-center text-center border-2 border-megan-500 max-w-sm mx-auto rounded-md bg-megan-50 p-5"
			>
				<h2 class="mb-2">Sorry</h2>
				<p class="text-2xl uppercase">{data.message}</p>
				<p class="mt-4">
					<a href="/" class="flex justify-center items-center gap-2 -translate-x-2">
						<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
							><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg
						>
						Back Home</a
					>
				</p>
			</div>
		</div>
	{:else if status === 'loading'}
		<p>Loading...</p>
	{:else if status === 'idle'}
		<div class="grid grid-rows-[auto_1fr] relative">
			<div
				class="px-4 py-1 bg-megan-300/35 text-center text-megan-700 grid grid-cols-[auto_1fr_auto]"
			>
				<button bind:this={sortButton} on:click={toggleDropdown}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 -960 960 960"
						class="w-4 h-4 fill-megan-700 translate-y-[1px]"
						><path
							d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z"
						/></svg
					>
				</button>

				<h3 class="text-lg">{data.title}</h3>
				<button on:click={() => helpDialog.showModal()}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 -960 960 960"
						class="w-4 h-4 fill-megan-700"
						><path
							d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
						/></svg
					>
				</button>
			</div>

			<div class="flex gap-2 p-1 px-2 bg-megan-50 border-b border-megan-600 overflow-x-auto">
				{#if isFilter}
					<button
						class="font-mono text-xs bg-megan-400 px-4 uppercase py-[2px] rounded-full text-nowrap"
						on:click={clearFilter}>clear</button
					>
				{:else}
					{#each tagsCount as { displayName, count }}
						<button
							on:click={() => filterBaseOnUserName(displayName)}
							class="font-mono text-xs bg-megan-600 px-2 pr-[2px] py-[2px] rounded-full text-megan-100 text-nowrap"
						>
							{displayName}
							<span
								class="bg-white text-megan-600 rounded-full p-1 h-4 text-center inline-grid place-content-center"
								>{count}</span
							>
						</button>
					{/each}
				{/if}
			</div>

			<dialog bind:this={helpDialog} class="bg-transparent">
				<GetStarted close={() => helpDialog.close()} showCloseButton />
			</dialog>

			{#if count === 0 && status === 'idle'}
				<GalleryIntro />
			{:else}
				<ul class="grid grid-cols-3 lg:grid-cols-5 bg-slate-50 gap-[2px] border-2 border-slate-50">
					{#each images as item (item.id)}
						{#if item.url}
							<li class="grid">
								<a href={`/gallery/${data.id}/${item.id}`} class="col-start-1 row-start-1">
									<img
										src={`${item.url}&tr=w-${iconSize},h-${iconSize}`}
										alt=""
										class="aspect-square overflow-hidden object-cover bg-slate-100/60"
										loading="lazy"
										width={iconSize}
										height={iconSize}
									/>
								</a>
								<LikeButton hideCount id={item.id} {toggleLike} likes={item.likes} />
							</li>
						{/if}
					{/each}
				</ul>
			{/if}
			{#if data.imageCount !== 0 && totalNumberRequested < $gallery.length}
				<div class="absolute bottom-2 left-2 right-2 flex justify-center" use:viewport={loadMore}>
					<Button on:click={loadMore}>View More</Button>
				</div>
			{/if}
		</div>
	{/if}
</div>

{#if data.status === 'idle'}
	<div>
		<input
			type="file"
			multiple
			on:change={handleFileChange}
			bind:this={input}
			class="hidden invisible"
			accept="image/*"
		/>
		<button
			class:hide-button={hideButton}
			on:click={checkIfCanUpload}
			class="translate-x-0 transition-all add-btn z-50 flex items-center bg-megan-600 hover:bg-megan-800 fixed bottom-8 rounded-full lg:bottom-20 right-4"
		>
			<div class="text-white overflow-hidden transition-all">
				<div class="pl-6 whitespace-nowrap uppercase">Add Your Memories</div>
			</div>
			<div class="grid place-content-center rounded-full w-14 aspect-square">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-8 h-8 fill-white"
					><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg
				>
			</div>
		</button>
	</div>
{/if}
<dialog bind:this={sortDialog} class="absolute">
	<Sort {sortDialog} />
</dialog>

<Dialog
	id="gallryUpload"
	bind:dialog
	on:close={() => (displayName ? handleDialogClose() : updateDisplayName())}
	cancel={displayName ? 'Cancel' : null}
	confirm={displayName
		? 'Close'
		: `<div class="flex gap-2">Next
		<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" class="fill-current w-4"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
		</div>`}
>
	{#if !displayName}
		<div class="grid gap-4 w-3/4 mx-auto">
			<p>Please enter your name to upload your memories</p>
			<Input id="diplayName" label="Your Name" bind:value={displayNameInput} />
		</div>
	{/if}

	{#if files}
		<ul class="grid gap-1 overflow-scroll">
			{#each Array.from(files) as file}
				<li class="bg-megan-50 p-4">
					<UploadTask ref={`${data.id}/${file.name}`} data={file} let:progress let:snapshot>
						{#if snapshot?.state === 'running'}
							<p class="text-xs mb-2 text-left font-bold">{file.name}</p>
							<div class="flex items-center gap-4">
								<progress value={progress.toFixed(2)} max="100" class="flex-1" />
								<p class="text-lg">{progress.toFixed(2)}%</p>
							</div>
						{/if}

						{#if snapshot?.state === 'success'}
							{@const updated = imageAddedToGallery(file)}
							<p class="text-xs mb-2 text-left font-bold">{file.name}</p>

							<div class="flex items-center gap-4">
								<progress value={progress.toFixed(2)} max="100" class="flex-1" />

								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 -960 960 960"
									class="w-8 h-8 fill-green-800"
									><path
										d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
									/></svg
								>
							</div>
						{/if}

						{#if snapshot?.state === 'error'}
							<p>Error: {file.name} did not upload</p>
						{/if}
					</UploadTask>
				</li>
			{/each}
		</ul>
	{/if}
</Dialog>

<style lang="postcss">
	progress[value] {
		--color: rgb(147, 31, 62); /* the progress color */
		--background: rgb(255, 255, 255); /* the background color */

		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		height: 20px;
		border: 1px solid var(--color);
		border-radius: 10em;
		background: var(--background);
	}
	progress[value]::-webkit-progress-bar {
		border-radius: 10em;
		background: var(--background);
	}
	progress[value]::-webkit-progress-value {
		border-radius: 10em;
		background: var(--color);
	}
	progress[value]::-moz-progress-bar {
		border-radius: 10em;
		background: var(--color);
	}

	.add-btn {
		box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.5);
	}

	.add-btn:active {
		translate: 1px 1px;
		box-shadow: none;
	}

	.hide-button {
		@apply translate-x-72;
	}
</style>
