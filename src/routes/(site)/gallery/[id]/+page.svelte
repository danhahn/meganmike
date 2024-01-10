<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import Section from '$lib/components/Section.svelte';
	import type { PageData } from './$types';
	import { DownloadURL, StorageList, UploadTask, collectionStore } from 'sveltefire';

	import { collection, where, query } from 'firebase/firestore';
	import { firestore } from '$lib/firebase/firebase';
	import { set } from 'firebase/database';
	import Button from '$lib/components/forms/Button.svelte';
	export let data: PageData;

	const postsRef = collection(firestore, 'galleries');
	const q = query(postsRef, where('name', '==', data.id));

	const gallery = collectionStore(firestore, q);

	$: isValidGallery = $gallery && $gallery.length === 1;

	let image = '';

	let file: File | undefined;

	let uploader: HTMLInputElement;

	function chooseFile(e: Event) {
		file = (e.target as HTMLInputElement).files?.[0];
		setTimeout(resetUpload, 2000);
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
	<Headline>Add a photo to todays event</Headline>

	<Section>
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

		<StorageList ref={data.id} let:list>
			{#if list === null}
				<p>Loading...</p>
			{:else if list.prefixes.length === 0 && list.items.length === 0}
				<li>Empty</li>
			{:else}
				<ul class="grid grid-cols-4 gap-4">
					<!-- Listing the prefixes -->
					{#each list.prefixes as prefix}
						<li>
							{prefix.name}
						</li>
					{/each}
					<!-- Listing the objects in the given folder -->
					{#each list.items as item}
						<li class="flex flex-col gap-2">
							<DownloadURL ref={`${data.id}/${item.name}`} let:link let:ref>
								<!-- show img -->
								{#if link}
									<button on:click={() => (image = link)}>
										<img src={link} alt={item.name} class="aspect-square object-cover" />
									</button>

									<!-- or download via link -->
									<Button size="small" href={link} download>Download</Button>
								{/if}
							</DownloadURL>
						</li>
					{/each}
				</ul>
			{/if}
		</StorageList>
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
