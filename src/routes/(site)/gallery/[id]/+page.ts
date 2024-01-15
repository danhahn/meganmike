import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const { id } = params;
	return { id };
}) satisfies PageLoad;
