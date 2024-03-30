import { writable } from 'svelte/store';

type SortDirection = 'asc' | 'desc';
export type SortField = 'dateTaken' | 'dateAdded' | 'likes';

export const sortDirectionStore = writable<SortDirection>('desc');
export const sortFieldStore = writable<SortField>('dateAdded');
