import { z } from 'zod';

export const createBookSchema = z.object({
  title: z.string().min(1, { message: 'Title too short' }),
  author: z.string().min(1, { message: 'Author should be defined' }),
  pages: z.coerce
    .number()
    .min(1, { message: 'amount of pages should be higger than 0' }),
});

export type CreateBookSchema = z.infer<typeof createBookSchema>;
