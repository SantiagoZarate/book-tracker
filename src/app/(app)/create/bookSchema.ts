import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1, { message: "Title too short" }),
  author: z.string().min(1, { message: "Author should be defined" }),
  pages: z.coerce.number(),
});

export type CreateBookSchema = z.infer<typeof createBookSchema>;
