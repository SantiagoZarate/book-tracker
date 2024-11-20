import { z } from 'zod';

export const bookSchemaDTO = z.object({
  id: z.string(),
  title: z.string(),
  totalPages: z.number(),
  author: z.string(),
});

export type BookDTO = z.infer<typeof bookSchemaDTO>;

export const genreSchemaDTO = z.object({
  name: z.string(),
});

export type GenreDTO = z.infer<typeof genreSchemaDTO>;

export const bookGenresSchemaDTO = bookSchemaDTO.extend({
  genres: z.array(genreSchemaDTO),
});

export type BookGenresDTO = z.infer<typeof bookGenresSchemaDTO>;
