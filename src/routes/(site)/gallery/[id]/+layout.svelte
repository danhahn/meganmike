<script lang="ts">
	import { FirebaseApp, collectionStore } from 'sveltefire';
	import { auth, firestore, storage } from '$lib/firebase/firebase';
	import type { LayoutData } from './$types';
	import { gallery, galleryId } from '$lib/stores/galleryStore';
	import { collection, orderBy, query, where } from 'firebase/firestore';
	import type { Image } from '$lib/types';
	import { sortDirectionStore, sortFieldStore } from '$lib/stores/sortStore';

	export let data: LayoutData;

	let photosQuery = query(
		collection(firestore, 'photos'),
		where('gallery', '==', data.id),
		orderBy($sortFieldStore, $sortDirectionStore)
	);

	$: {
		photosQuery = query(
			collection(firestore, 'photos'),
			where('gallery', '==', data.id),
			orderBy($sortFieldStore, $sortDirectionStore)
		);
	}

	$: photos = collectionStore<Image>(firestore, photosQuery as any);

	$: gallery.set($photos);
	$: galleryId.set(data.id);
</script>

<FirebaseApp {auth} {firestore} {storage}>
	<slot />
</FirebaseApp>
