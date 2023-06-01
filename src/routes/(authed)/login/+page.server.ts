import { superValidate } from 'sveltekit-superforms/server';
import type { Actions } from './$types';
import { loginSchema } from '$lib/schema/loginSchema';
import { fail } from '@sveltejs/kit';

export const load = async (event) => {
	const form = await superValidate(event, loginSchema);
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, loginSchema);
		if (!form.valid) {
			return fail(400, { form });
		}
		return { form };
	}
} satisfies Actions;
