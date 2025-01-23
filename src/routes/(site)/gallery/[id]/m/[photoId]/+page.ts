import { gallery } from '$lib/stores/galleryStore';
import type { PageLoad } from './$types';
import type { Image } from '$lib/types';

export const load = (async ({ params }) => {
	const { id, photoId } = params;

	let galleryData: Image[] = [];

	gallery.subscribe((value) => {
		galleryData = value;
	});

	const photoIndex = galleryData.findIndex((photo) => photo.id === photoId);

	return {
		id,
		photoId,
		photoIndex
	};
}) satisfies PageLoad;
