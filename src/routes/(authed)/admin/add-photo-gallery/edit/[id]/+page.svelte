<script lang="ts">
	import { collectionStore } from 'sveltefire';
	import type { PageData } from './$types';
	import { db } from '$lib/firebase/firebase';
	import { query, collection, where, Timestamp, setDoc, doc, orderBy } from 'firebase/firestore';
	import Headline from '$lib/components/Headline.svelte';
	import type { Image } from '$lib/types';

	export let data: PageData;

	const q = query(
		collection(db, 'photos'),
		where('gallery', '==', data.id),
		orderBy('dateAdded', 'asc')
	);
	const allPhotos = collectionStore<Image>(db, q as any);

	$: photos = [
		...$allPhotos.filter((photo) => photo.disabled !== true),
		...$allPhotos.filter((photo) => photo.disabled === true)
	];

	const iconSize = 50;

	async function deletePhoto(id: string) {
		const confirm = window.confirm('Are you sure you want to remove this photo?');
		if (!confirm) return;
		await setDoc(doc(db, 'photos', id), { disabled: true }, { merge: true });
	}

	async function restorePhoto(id: string) {
		await setDoc(doc(db, 'photos', id), { disabled: false }, { merge: true });
	}

	function formatDate(timestamp: Timestamp) {
		const date = timestamp.toDate();
		const jsDate = new Date(date);
		return jsDate.toLocaleDateString() + ' ' + jsDate.toLocaleTimeString();
	}
</script>

<Headline>Edit Photo Gallery</Headline>

<div class="grid grid-cols-1 gap-[1px]">
	<div
		class="border border-black/20 bg-megan-600 text-white p-1 grid grid-cols-[50px_1fr_1fr_1fr_1fr_auto] gap-4 items-center"
	>
		<div class="grid place-content-center">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-4 h-4 fill-current"
				><path
					d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"
				/></svg
			>
		</div>
		<p>Uploaded By</p>
		<p>Name</p>
		<p>Date Taken</p>
		<p>Date Added</p>
		<p class=" mr-4 p-2">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-4 h-4 fill-current"
				><path
					d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
				/></svg
			>
		</p>
	</div>
	{#each photos as photo (photo.id)}
		<div
			class={`border border-black/20 bg-white p-1 grid grid-cols-[50px_1fr_1fr_1fr_1fr_auto] gap-4 items-center ${
				photo.disabled ? 'opacity-50' : ''
			}`}
		>
			<img
				src={`${photo.url}&tr=w-${iconSize},h-${iconSize}`}
				alt={photo.name}
				class={`w-[${iconSize}px] h-[${iconSize}px] aspect-square object-cover`}
				width={iconSize}
				height={iconSize}
				loading="lazy"
			/>
			<p>{photo.uploadedBy}</p>
			<p>{photo.name}</p>
			<p class="text-xs">{formatDate(photo.dateTaken)}</p>
			<p class="text-xs">{formatDate(photo.dateAdded)}</p>
			{#if photo.disabled}
				<button
					on:click={() => restorePhoto(photo.id)}
					class="p-2 rounded-md bg-megan-600 text-white mr-4">restore</button
				>
			{:else}
				<button
					class="p-2 rounded-md bg-megan-600 text-white mr-4"
					on:click={() => deletePhoto(photo.id)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 -960 960 960"
						class="w-4 h-4 fill-current"
						><path
							d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
						/></svg
					>
				</button>
			{/if}
		</div>
	{/each}
</div>
