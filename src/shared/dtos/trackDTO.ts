import { z } from "zod";
import { bookSchemaDTO } from "./bookDTO";

export const trackSchemaDTO = z.object({
  id: z.string(),
  bookId: z.string(),
  pagesAlreadyRead: z.coerce.number(),
  isCompleted: z.coerce.boolean(),
  startedAt: z.string(),
});

export type TrackDTO = z.infer<typeof trackSchemaDTO>;

export const trackBookSchemaDTO = trackSchemaDTO
  .omit({
    bookId: true,
  })
  .extend({
    book: bookSchemaDTO,
  });

export type TrackBookDTO = z.infer<typeof trackBookSchemaDTO>;
