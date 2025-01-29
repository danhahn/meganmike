<script lang="ts">
	import { FirebaseApp, collectionStore, userStore } from 'sveltefire';
	import { auth, firestore, storage } from '$lib/firebase/firebase';
	import type { LayoutData } from './$types';
	import { gallery, galleryId } from '$lib/stores/galleryStore';
	import { collection, orderBy, query, where } from 'firebase/firestore';
	import type { Image } from '$lib/types';
	import { sortDirectionStore, sortFieldStore } from '$lib/stores/sortStore';
	import { signOut } from 'firebase/auth';
	import CommentPopover from '$lib/components/comments/CommentPopover.svelte';
	import { onMount } from 'svelte';
	import { functionSignInWithGoogle } from '$lib/firebase';
	import Button from '$lib/components/forms/Button.svelte';
	export let data: LayoutData;

	let photosQuery: any;
	let status: 'preload' | 'loading' | 'error' | 'success' = 'preload';

	// add firebase auth anonymous login

	const user = userStore(auth);

	if (data.id) {
		photosQuery = query(
			collection(firestore, 'photos'),
			where('gallery', '==', data.id),
			orderBy($sortFieldStore, $sortDirectionStore)
		);
	}

	$: {
		photosQuery = query(
			collection(firestore, 'photos'),
			where('gallery', '==', data.id),
			orderBy($sortFieldStore, $sortDirectionStore)
		);
	}

	$: photos = collectionStore<Image>(firestore, photosQuery as any);

	$: gallery.set($photos.filter((photo) => photo.disabled !== true));
	$: galleryId.set(data.id);

	onMount(() => {
		if (data.id) {
			status = 'success';
		} else {
			status = 'error';
		}
	});
</script>

<FirebaseApp {auth} {firestore} {storage}>
	{#if status === 'preload'}
		<p>Loading...</p>
	{:else if status === 'loading'}
		<p>Loading...</p>
	{:else if status === 'error'}
		<p>Error</p>
	{:else if status === 'success'}
		{#if !$user?.uid}
			<button on:click={() => functionSignInWithGoogle()}>Sign In With Google</button>
		{:else}
			<div class="hidden md:flex fixed top-0 left-0 right-0 z-50 justify-between p-1 bg-megan-700">
				<div class="flex gap-2 items-center pl-2">
					<div class="avatar">
						<div class="w-6 rounded-full bg-megan-50 border border-megan-500">
							<img src={$user.photoURL} alt={$user.displayName} />
						</div>
					</div>
					<p class="text-sm font-sans font-extrabold text-megan-50">{$user.displayName}</p>
				</div>
				<div><Button size="small" on:click={() => signOut(auth)}>logout</Button></div>
			</div>
			<slot />
		{/if}
	{/if}
	<CommentPopover />
</FirebaseApp>
