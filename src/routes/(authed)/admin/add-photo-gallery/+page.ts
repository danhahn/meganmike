import {
	Timestamp,
	collection,
	getCountFromServer,
	getDocs,
	limit,
	orderBy,
	query,
	where
} from 'firebase/firestore';
import type { PageLoad } from './$types';
import { db } from '$lib/firebase/firebase';

type GalleryData = {
	name: string;
	imageCount: number;
	path: string;
	url: string;
	date: Timestamp;
};

export const load = (async () => {
	// get all galleries from firebase firestore
	const q = query(collection(db, 'galleries'), orderBy('date', 'desc'));

	const galleries: GalleryData[] = [];

	const querySnapshot = await getDocs(q);
	querySnapshot.forEach(async (doc) => {
		// get count of images in the gallery
		const q1 = query(collection(db, 'photos'), where('gallery', '==', doc.data().name), limit(1));
		const q2 = query(collection(db, 'photos'), where('gallery', '==', doc.data().name));

		// get the first image from the gallery
		const snapshot = await getDocs(q1);
		const urlDoc = snapshot.docs[0];

		const url = urlDoc ? urlDoc.data().url + `&tr=w-400,h-400,c-at_least` : '';

		const imageCount = await getCountFromServer(q2);

		galleries.push({
			name: doc.data().name,
			imageCount: imageCount.data().count,
			path: doc.data().path,
			url,
			date: doc.data().date
		} as GalleryData);
	});

	return { galleries };
}) satisfies PageLoad;
