'use server';

import { trackService } from '@/services/track/track.service';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createServerAction } from 'zsa';

export const addBookAction = createServerAction()
  .input(
    z.object({
      bookId: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    try {
      await trackService.create({
        bookId: input.bookId,
      });
    } catch (error) {
      console.log(error);
    }
    revalidatePath('/', 'page');
    redirect('/');
  });
