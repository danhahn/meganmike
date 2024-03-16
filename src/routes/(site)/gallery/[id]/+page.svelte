<script lang="ts">
	import { DownloadURL, UploadTask, collectionStore } from 'sveltefire';
	import type { PageData } from './$types';
	import Dialog from '$lib/components/Dialog.svelte';
	import { rewriteUrl } from '$lib/utils';
	import { db, firestore } from '$lib/firebase/firebase';
	import { dev } from '$app/environment';
	import { Timestamp, addDoc, collection, orderBy, query, where } from 'firebase/firestore';
	import Input from '$lib/components/forms/Input.svelte';
	import { onMount } from 'svelte';
	import type { Image } from '$lib/types';

	export let data: PageData;

	let dialog: HTMLDialogElement;
	let input: HTMLInputElement;
	let status: 'loading' | PageData['status'] = 'loading';
	let files: FileList | null = null;
	let displayNameInput: string;
	let displayName: string;
	$: status = data.status;

	console.log(data);

	const imagesRef = collection(db, 'photos');
	const q = query(imagesRef, where('gallery', '==', data.id), orderBy('dateAdded', 'desc'));
	const images = collectionStore<Image>(firestore, q as any);

	const handleFileChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		files = input.files;
		// check if files is not null
		if (files) {
			dialog.showModal();
		}
	};

	function handleDialogClose() {
		if (dialog.returnValue === 'success') {
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
		const docRef = await addDoc(collection(db, 'photos'), {
			name: file.name,
			dateTaken: Timestamp.fromDate(new Date(file.lastModified)),
			dateAdded: Timestamp.now(),
			uploadedBy: displayName,
			size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
			likes: 0,
			gallery: data.id
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
		// check if displayname is in local storage
		const isInLocalStage = localStorage.getItem('displayName');
		if (isInLocalStage) {
			displayName = isInLocalStage;
		}
	});
</script>

<svelte:head>
	<title>Gallery | {data.id}</title>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>

{#if status === 'loading'}
	<p>Loading...</p>
{:else if status === 'idle'}
	<h3 class="p-4 uppercase bg-megan-300/35 text-center text-megan-700">{data.id}</h3>

	<input
		type="file"
		multiple
		on:change={handleFileChange}
		bind:this={input}
		class="hidden invisible"
		accept="image/*"
	/>

	<button
		on:click={checkIfCanUpload}
		class="bg-megan-600 hover:bg-megan-800 w-14 aspect-square grid place-content-center rounded-full fixed bottom-8 lg:bottom-20 right-4"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-8 h-8 fill-white"
			><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg
		>
	</button>

	{#if data.imageCount === 0 && status === 'idle'}
		<p>Be the first to add a memory</p>
	{:else}
		<ul class="grid grid-cols-3 lg:grid-cols-8">
			{#each $images as item (item.name)}
				<li>
					<DownloadURL ref={`${data.id}/${item.name}`} let:link let:ref>
						{@const optimizedUrl = rewriteUrl(link)}
						<a href={optimizedUrl} download
							><img
								src={`${optimizedUrl}&tr=w-300,h-300`}
								alt=""
								class="aspect-square overflow-hidden object-cover"
							/></a
						>
					</DownloadURL>
				</li>
			{/each}
		</ul>
	{/if}
{:else if status === 'error'}
	<p>Invalid gallery ID</p>
{/if}

<Dialog
	id="addGuest"
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

	button {
		box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.5);
	}

	button:active {
		translate: 1px 1px;
		box-shadow: none;
	}
</style>
