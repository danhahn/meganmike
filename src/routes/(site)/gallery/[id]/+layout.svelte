<script lang="ts">
	import { FirebaseApp, collectionStore } from 'sveltefire';
	import { auth, firestore, storage } from '$lib/firebase/firebase';
	import type { LayoutData } from './$types';
	import { gallery, galleryId } from '$lib/stores/galleryStore';
	import { collection, orderBy, query, where } from 'firebase/firestore';
	import type { Image } from '$lib/types';
	import { sortDirectionStore, sortFieldStore } from '$lib/stores/sortStore';
	import { signInAnonymously } from 'firebase/auth';
	import { userId } from '$lib/stores/user';
	export let data: LayoutData;

	let photosQuery: any;

	// add firebase auth anonymous login

	$: signInAnonymously(auth).catch((error) => {
		console.error('Error signing in anonymously', error);
	});

	auth.onAuthStateChanged((user) => {
		if (user) {
			console.log('User is signed in', user);
			userId.set(user.uid);
		} else {
			console.log('User is signed out');
		}
	});

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
</script>

<FirebaseApp {auth} {firestore} {storage}>
	<slot />
</FirebaseApp>
