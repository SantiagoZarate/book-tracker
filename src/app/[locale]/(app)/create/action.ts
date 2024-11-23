'use server';

import { booksService } from '@/services/book/book.service';
import { revalidatePath } from 'next/cache';
import { createServerAction, ZSAError } from 'zsa';
import { createBookSchema } from './bookSchema';

export const createBookAction = createServerAction()
  .input(createBookSchema)
  .handler(async ({ input }) => {
    try {
      await booksService.create({
        author: input.author,
        title: input.title,
        totalPages: input.pages,
        genres: input.genres.map((g) => g.value),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new ZSAError('ERROR', error);
      }
    }
    revalidatePath('/add');
  });
