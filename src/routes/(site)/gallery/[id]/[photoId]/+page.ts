import { db } from '$lib/firebase/firebase';
import {
	query,
	collection,
	getDocs,
	doc,
	getDoc,
	startAt,
	limit,
	orderBy
} from 'firebase/firestore';
import type { PageLoad } from './$types';

type Photo = {
	id: string;
	url: string;
	uploadedBy: string;
	likes: number;
	name: string;
};

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

	const test = query(imagesRef, orderBy('dateAdded', 'desc'), startAt(photoRef), limit(2));

	const nextSnap = await getDocs(test);

	const currentPhots: Photo[] = [];

	nextSnap.forEach((doc) => {
		currentPhots.push({
			id: doc.id,
			url: doc.data().url,
			uploadedBy: doc.data().uploadedBy,
			likes: doc.data().likes,
			name: doc.data().name
		});
	});

	const [currentPhoto, nextPhoto] = currentPhots;

	return {
		currentPhoto,
		nextPhoto,
		id
	};
}) satisfies PageLoad;
