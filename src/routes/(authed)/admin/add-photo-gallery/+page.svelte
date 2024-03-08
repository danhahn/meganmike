<script lang="ts">
	import { goto } from '$app/navigation';
	import Headline from '$lib/components/Headline.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { db } from '$lib/firebase/firebase';
	import { DownloadURL } from 'sveltefire';

	import { addDoc, collection } from 'firebase/firestore';
	import { Collection } from 'sveltefire';

	let galleryName = '';
	let errorMessage = '';

	const firebaseDoc = 'galleries';
	const galleryUrl = 'gallery';

	async function handleSubmit(e: Event) {
		if (!galleryName) {
			errorMessage = 'Please enter a gallery name';
			return;
		}
		errorMessage = '';
		// write to the firestore
		await addDoc(collection(db, firebaseDoc), {
			name: galleryName,
			photos: []
		});
		galleryName = '';
	}
</script>

<Headline>Add A Photo Gallery</Headline>

<div class="border border-black rounded-lg bg-megan-100 p-4 grid gap-4">
	<h3 class="text-2xl text-megan-600">Add New Gallery</h3>
	<form class="flex gap-4" on:submit|preventDefault={handleSubmit}>
		<Input
			{errorMessage}
			type="text"
			label="Gallery Name"
			id="gallery-name"
			bind:value={galleryName}
		/>
		<Button type="submit" class="whitespace-nowrap self-start h-[52px]">Add Gallery</Button>
	</form>
</div>

<div class="mt-4 grid gap-4">
	<Collection ref={firebaseDoc} let:data let:count>
		<h3 class="text-2xl text-megan-600">Found {count} Gallery</h3>

		<div class="grid lg:grid-cols-2 gap-4">
			{#each data as gallery}
				<div class="grid gap-4 bg-white border border-megan-800 p-4">
					<p>Name: <span class="text-megan-600 font-extrabold">{gallery.name}</span></p>
					{#if gallery.photos.length > 0}
						<DownloadURL ref={`${gallery.name}/${gallery.photos[0].name}`} let:link let:ref>
							<!-- show img -->

							<img src={link} class="aspect-square object-cover" alt="" />

							<!-- or download via link -->
						</DownloadURL>
					{/if}
					<p>(Photos {gallery.photos.length})</p>
					<Button class="whitespace-nowrap" on:click={() => goto(`/${galleryUrl}/${gallery.name}`)}>
						View
					</Button>
					<Button on:click={() => goto(`/admin/add-photo-gallery/${gallery.name}`)}
						>Print QR Code</Button
					>
				</div>
			{/each}
		</div>

		<p slot="loading">Loading...</p>
	</Collection>
</div>
