import type { Image, UserImageCountList } from '$lib/types';
import { writable } from 'svelte/store';

export const gallery = writable<Image[]>([]);
export const galleryId = writable<string | null>(null);
export const userImageCount = writable<UserImageCountList>([]);
