<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Section from '$lib/components/Section.svelte';
	import type { PageData } from './$types';
	import { DownloadURL, UploadTask, collectionStore } from 'sveltefire';

	import { collection, where, query } from 'firebase/firestore';
	import { firestore } from '$lib/firebase/firebase';
	import { set } from 'firebase/database';
	import Button from '$lib/components/forms/Button.svelte';
	export let data: PageData;

	const postsRef = collection(firestore, 'galleries');
	const q = query(postsRef, where('name', '==', data.id));

	const gallery = collectionStore(firestore, q);

	$: isValidGallery = $gallery && $gallery.length === 1;

	let files: FileList;

	let file: File | undefined;

	let uploader: HTMLInputElement;

	function chooseFile(e: Event) {
		file = (e.target as HTMLInputElement).files?.[0];
	}

	function resetUpload() {
		file = undefined;
		uploader.value = '';
	}
</script>

<svelte:head>
	<title>Gallery | {data.id}</title>
</svelte:head>

{#if !isValidGallery}
	<Headline>Gallery not found</Headline>
	<Section>
		<p>Sorry, we couldn't find the gallery you were looking for.</p>
	</Section>
{:else}
	<Headline>Add Photos to the gallery</Headline>

	<Section>
		<p>Share your photos from todays event</p>

		<input bind:this={uploader} type="file" accept="image/*" on:change={chooseFile} />

		<p>{data.id}</p>

		{#if file}
			<UploadTask ref={`${data.id}/${file.name}`} data={file} let:progress let:snapshot>
				{#if snapshot?.state === 'running'}
					<progress value={progress} max="100">{progress}%</progress>
					{progress.toFixed(2)}% uploaded
				{/if}

				{#if snapshot?.state === 'success'}
					<Button on:click={resetUpload}>Reset</Button>
					<DownloadURL ref={snapshot?.ref} let:link>
						<a href={link} download>
							<img src={link} alt="" />
						</a>
					</DownloadURL>
				{/if}
			</UploadTask>
		{/if}
	</Section>
{/if}
