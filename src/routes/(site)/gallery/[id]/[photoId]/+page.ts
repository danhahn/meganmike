import { db } from '$lib/firebase/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const { id, photoId } = params;

	const imagesRef = collection(db, 'photos');

	const photoRef = await getDoc(doc(imagesRef, photoId));

	// check if photoRef exists
	if (!photoRef.exists()) {
		return {
			status: 404,
			error: 'Photo not found'
		};
	}

	return {
		id
	};
}) satisfies PageLoad;
