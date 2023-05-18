import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (({ cookies, url }) => {
	if (!cookies.get('logged_in')) {
		throw redirect(303, `/login?redirectTo=${url.pathname}`);
	}
}) satisfies LayoutServerLoad;
