import { capitalizeEachWord } from '@/app/lib/capitalizeWords';
import { z } from 'zod';

const VALID_MIME_TYPE = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/svg+xml',
  'image/gif',
];

const MAX_SIZE = 1024 * 1024 * 5;

const IMAGE_SCHEMA = z
  .instanceof(File)
  .refine((file) => VALID_MIME_TYPE.includes(file.type), {
    message: 'Invalid image file type',
  })
  .refine((file) => file.size < MAX_SIZE);

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
  cover: IMAGE_SCHEMA.optional(),
});

export type CreateBookSchema = z.infer<typeof createBookSchema>;
