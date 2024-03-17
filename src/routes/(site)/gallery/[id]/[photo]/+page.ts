import { db } from '$lib/firebase/firebase';
import { query, collection, where, getDocs, getCountFromServer } from 'firebase/firestore';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const { id, photo } = params;

	const galleryRef = query(collection(db, 'galleries'), where('name', '==', id));

	const gallery = await getDocs(galleryRef);

	const imagesRef = collection(db, 'photos');
	// get count of images in the gallery
	const q = query(imagesRef, where('gallery', '==', id));

	const snapshot = await getCountFromServer(q);
	const imageCount = snapshot.data().count;

	return { id, status: !gallery.empty ? 'idle' : 'error', imageCount, photo };
}) satisfies PageLoad;
