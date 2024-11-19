import { z } from "zod";
import { bookSchemaDTO } from "./bookDTO";
import { sessionSchemaDTO } from "./sessionDTO";

export const trackSchemaDTO = z.object({
  id: z.string(),
  bookId: z.string(),
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

export const trackBookSessionsSchemaDTO = trackBookSchemaDTO.extend({
  sessions: z.array(
    sessionSchemaDTO.omit({
      trackId: true,
    })
  ),
});

export type TrackBookSessionsDTO = z.infer<typeof trackBookSessionsSchemaDTO>;
