import type { LayoutLoad } from './$types';

export const load = (async ({ params }) => {
	const { id, photoId } = params;
	return { id, photoId };
}) satisfies LayoutLoad;
