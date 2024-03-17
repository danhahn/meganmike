<script lang="ts">
	import { goto } from '$app/navigation';
	import Headline from '$lib/components/Headline.svelte';
	import Button from '$lib/components/forms/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { db } from '$lib/firebase/firebase';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { Timestamp, addDoc, collection } from 'firebase/firestore';

	export let data: PageData;

	$: galleries = data.galleries;

	$: console.log(galleries);

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
			name: encodeURIComponent(galleryName.replaceAll("'", '').replaceAll(' ', '-').toLowerCase()),
			title: galleryName,
			photos: [],
			date: Timestamp.now()
		});
		galleryName = '';

		// reload page
		window.location.reload();
	}
</script>

<Headline>Add A Photo Gallery</Headline>

<div class="border border-black rounded-lg bg-megan-100 p-4 grid gap-4">
	<h3 class="text-2xl text-megan-600">Add New Gallery</h3>
	<form class="flex gap-4 flex-col lg:flex-row" on:submit|preventDefault={handleSubmit}>
		<Input
			{errorMessage}
			type="text"
			label="Gallery Name"
			id="gallery-name"
			bind:value={galleryName}
		/>
		<div class=" mx-auto">
			<Button type="submit" class="whitespace-nowrap self-start h-[52px]">Add Gallery</Button>
		</div>
	</form>
</div>

{#if galleries.length === 0}
	<p>No galleries found</p>
{:else}
	<div class="mt-4 grid gap-4">
		<h3 class="text-2xl text-megan-600">Found {data.galleries.length} Gallery</h3>

		<div class="grid lg:grid-cols-2 gap-4">
			{#each galleries as gallery}
				<div class="grid gap-4 bg-white border border-megan-800 p-4">
					<p>Name: <span class="text-megan-600 font-extrabold">{gallery.title}</span></p>

					<p>
						Date Created: <span class="text-megan-600 font-extrabold"
							>{new Date(gallery.date.seconds * 1000).toLocaleDateString()}</span
						>
						<span>
							{new Date(gallery.date.seconds * 1000).toLocaleTimeString()}
						</span>
					</p>

					{#if gallery.url}
						<img src={gallery.url} class="aspect-square object-cover" alt="" />
					{:else}
						<p class="aspect-square grid place-content-center bg-slate-300/45">No photos found</p>
					{/if}
					<p>(Photos {gallery.imageCount})</p>
					<Button class="whitespace-nowrap" on:click={() => goto(`/${galleryUrl}/${gallery.name}`)}>
						View
					</Button>
					<Button on:click={() => goto(`/admin/add-photo-gallery/${gallery.name}`)}
						>Print QR Code</Button
					>
				</div>
			{/each}
		</div>
	</div>
{/if}
