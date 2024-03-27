import { collection, where, query, getDocs, getCountFromServer } from 'firebase/firestore';

import { db } from '$lib/firebase/firebase';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const { id } = params;

	const slug = encodeURIComponent(id);

	// check if the id is a valid gallery from firestore
	const galleryRef = query(collection(db, 'galleries'), where('name', '==', slug));

	const gallery = await getDocs(galleryRef);

	if (gallery.empty) {
		return { status: 'error', message: 'Gallery not found' };
	}
	// get the title from the first document in the query snapshot
	const title = gallery.docs[0].data().title || 'Untitled Gallery';

	const imagesRef = collection(db, 'photos');
	// get count of images in the gallery
	const q = query(imagesRef, where('gallery', '==', id));

	const snapshot = await getCountFromServer(q);
	const imageCount = snapshot.data().count;

	return { id, status: !gallery.empty ? 'idle' : 'error', imageCount, title };
}) satisfies PageLoad;
