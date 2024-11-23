import { capitalizeEachWord } from '@/app/lib/capitalizeWords';
import { z } from 'zod';

export const createBookSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title too short' })
    .transform((data) => data.trim())
    .transform((data) => capitalizeEachWord(data)),
  author: z
    .string()
    .min(1, { message: 'Author should be defined' })
    .transform((data) => data.trim())
    .transform((data) => capitalizeEachWord(data)),
  pages: z.coerce
    .number()
    .min(1, { message: 'amount of pages should be higger than 0' }),
  genres: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    )
    .min(1, 'The book must at least have one genre'),
});

export type CreateBookSchema = z.infer<typeof createBookSchema>;
