<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Section from '$lib/components/Section.svelte';
	import type { PageData } from './$types';
	import { DownloadURL, StorageList, UploadTask, collectionStore } from 'sveltefire';

	import { collection, where, query, doc, arrayUnion, updateDoc } from 'firebase/firestore';
	import { firestore } from '$lib/firebase/firebase';
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

	$: console.log(g);

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
</script>

<svelte:head>
	<title>Gallery | {data.id}</title>
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
					<progress value={progress} max="100">{progress}%</progress>
					{progress.toFixed(2)}% uploaded
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
			<p>Please upload a any photos you have from todays event to share with Megan and Mike.</p>

			<input
				class="file-input"
				id="file_input"
				bind:this={uploader}
				type="file"
				accept="image/*"
				on:change={chooseFile}
			/>
		{/if}

		{#if image}
			<img src={image} alt="" />
		{/if}

		<ul class="grid grid-cols-2 lg:grid-cols-4 gap-4">
			<!-- Listing the objects in the given folder -->
			{#each g.photos as item}
				<li class="flex flex-col gap-2">
					<DownloadURL ref={`${data.id}/${item.name}`} let:link let:ref>
						<!-- show img -->
						{#if link}
							<button on:click={() => (image = link)}>
								<img src={link} alt={item.name} class="aspect-square object-cover" />
							</button>

							<p>{item.uploadedBy}</p>
							<p>{new Date(item.date).toLocaleTimeString()}</p>

							<!-- or download via link -->
							<Button size="small" href={link} download>Download</Button>
						{/if}
					</DownloadURL>
				</li>
			{/each}
		</ul>

		<Button
			on:click={() => {
				window.localStorage.removeItem('uploadedBy');
				uploadedBy = undefined;
			}}>Log out</Button
		>
	</Section>
{/if}

<style lang="postcss">
	.file-input {
		@apply border-megan-400 bg-megan-100 rounded-xl overflow-hidden border border-opacity-0 text-base;
	}

	.file-input::file-selector-button {
		border-style: solid;
		@apply p-4 px-8 mr-4 border-megan-300 bg-megan-300 text-megan-800 font-semibold  no-underline;
		border-width: var(--border-btn, 1px);
		animation: button-pop var(--animation-btn, 0.25s) ease-out;
	}

	.file-input::file-selector-button:hover {
		@apply bg-megan-400 border-megan-400;
	}
</style>
