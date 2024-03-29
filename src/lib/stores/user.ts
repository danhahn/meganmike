import { writable } from 'svelte/store';

export const user = writable(false);
export const userId = writable<string | undefined>(undefined);
