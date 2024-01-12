<script lang="ts">
	import { goto } from '$app/navigation';
	import Headline from '$lib/components/Headline.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { db } from '$lib/firebase/firebase';

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

<div class="mt-4">
	<Collection ref={firebaseDoc} let:data let:count>
		<h3 class="text-2xl text-megan-600">Found {count} Gallery</h3>

		{#each data as gallery}
			<div>
				<p>{gallery.name} (Photos {gallery.photos.length})</p>
				<Button class="whitespace-nowrap" on:click={() => goto(`/${galleryUrl}/${gallery.name}`)}>
					View
				</Button>
			</div>
		{/each}

		<p slot="loading">Loading...</p>
	</Collection>
</div>
