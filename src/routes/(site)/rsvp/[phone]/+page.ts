import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
  return {
    phone: params.phone
  }
}) satisfies PageLoad;