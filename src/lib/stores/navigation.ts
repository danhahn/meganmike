import { writable } from 'svelte/store';

export const nav = writable(false);
export const adminNav = writable(false);
export const pageIndex = writable(0);
