import { writable } from 'svelte/store';

type SortDirection = 'asc' | 'desc';
type SortField = 'dateTaken' | 'dateAdded' | 'likes' | 'uploadedBy';

export const sortDirectionStore = writable<SortDirection>('desc');
export const sortFieldStore = writable<SortField>('dateAdded');
