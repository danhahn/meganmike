import { superValidate } from 'sveltekit-superforms/server';
import type { Actions } from './$types';
import { loginSchema } from '$lib/schema/loginSchema';

export const load = async (event) => {
	const form = await superValidate(event, loginSchema);
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, loginSchema);
		console.log(form);
	}
} satisfies Actions;
