'use server';

import { revalidatePath } from 'next/cache';

export async function clearServerCache() {
  // Revalidate the entire application layout/routes
  revalidatePath('/', 'layout');
  return { cleared: true };
}
