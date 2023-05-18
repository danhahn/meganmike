import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: ({ cookies, url }) => {
		cookies.set('logged_in', 'true', { path: '/' });
		throw redirect(303, url.searchParams.get('redirectTo') ?? '/');
	}
} satisfies Actions;
