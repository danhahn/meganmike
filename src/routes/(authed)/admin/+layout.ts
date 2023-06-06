import { authStore, type AuthStore } from '$lib/stores/authStore';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

let user: AuthStore;

authStore.subscribe((value: AuthStore) => (user = value));

export const load = (() => {
	// if (!user.currentUser) {
	// 	throw redirect(303, '/login');
	// }
	return {};
}) satisfies LayoutLoad;
