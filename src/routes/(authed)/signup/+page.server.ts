import { superValidate } from 'sveltekit-superforms/server';
import type { Actions } from './$types';
import { signUpSchema } from '$lib/schema/signUpSchema';
import { fail } from '@sveltejs/kit';

export const load = async (event) => {
	const form = await superValidate(event, signUpSchema);
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, signUpSchema);
		if (!form.valid) {
			return fail(400, { form });
		}
		return { form };
	}
} satisfies Actions;
