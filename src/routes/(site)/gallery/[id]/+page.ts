import { collection, where, query, getDocs } from 'firebase/firestore';

import { db } from '$lib/firebase/firebase';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const { id } = params;

	// check if the id is a valid gallery from firestore
	const galleryRef = query(collection(db, 'galleries'), where('name', '==', id));

	const gallery = await getDocs(galleryRef);

	return { id, status: !gallery.empty ? 'idle' : 'error' };
}) satisfies PageLoad;
