import type { Image } from '$lib/types';
import { writable } from 'svelte/store';

export const gallery = writable<Image[]>([]);
export const galleryId = writable<string | null>(null);
